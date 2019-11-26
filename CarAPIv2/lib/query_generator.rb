require 'pry'

module QueryGenerator

  def self.execute (params={}, config)
    query = config[:init].call

    calls = []
    calls += build_search_calls(params, config)
    calls << build_order_call(params, config)

    completed_query = run_query(query, calls)
    meta = build_meta(completed_query)



    if params[:page]
      paginate(completed_query, params[:page], meta) # returns meta, query
    else
      return meta, completed_query
    end
  end

  # private
    def self.build_select (selector)
      -> (query) { query.select(selector) }
    end

    def self.build_join (joiner)
      -> (query) { query.joins(joiner).distinct }
    end

    def self.build_where(query_str, unsanitized_value)
      -> (query) { query.where("#{query_str} like ?", "%#{unsanitized_value}%") }
    end


    def self.build_search_calls (params, config)
      # binding.pry
      search_keys = config[:search_keys]

      selects = config[:default_selects].map { |str| build_select(str) }
      joins = config[:default_joins].map { |str|  build_join(str) }
      wheres = []

      # p 'past init'
      search_keys.keys.each do |key|
        if params[key]
          if search_keys[key][:select]
            selects << build_select(search_keys[key][:select])
          end

          if search_keys[key][:join]
            joins << build_join(search_keys[key][:join])
          end

          if search_keys[key][:query]
            wheres << build_where(search_keys[key][:query], params[key])
          end
        end
      end

      # binding.pry

      return selects + joins + wheres
    end

    def self.handle_default_order(config, desc=false)
      orders = config[:default_order].clone
      orders[0] = orders[0] + ' DESC' if desc
      order_str = orders.join(', ')
      -> (query) { query.order(order_str) }
    end

    def self.build_order_call( params, config)
      if params[:order] && params[:desc] == 'true'
        req_order = config[:search_keys][ params[:order].to_sym ][:query]
        -> (query) { query.order(req_order + ' DESC') } if req_order
      elsif params[:order]
        req_order = config[:search_keys][ params[:order].to_sym ][:query]
        -> (query) { query.order(req_order) } if req_order
      elsif params[:desc] == 'true'
        handle_default_order(config, true)
      else
        handle_default_order(config)
      end
    end

    def self.run_query (query, calls)
      calls.each {|call| query = call.call(query)}
      query
    end

    def self.build_meta (query)
      { total_items: query.size }
    end

    def self.paginate (query, page, meta)
      query = query.page page

      meta.merge!({
          paginated: true,
          cur_page: page.to_i, # TODO sanitization?
          per_page: Kaminari.config.default_per_page,
          count: query.size
      })

      return meta, query
    end
end
