require 'pry'

module QueryGenerator

  def self.execute (params={}, config)
    query = config[:init].call

    calls = []
    calls += build_search_calls(params, config)
    calls << build_order_call(params, config)

    completed_query = run_query(query, calls)
    meta = { total: completed_query.size }

    paginate(completed_query, params, meta) # returns meta, query
  end

  def self.paginate? params
    params[:page] || params[:perpage]
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

      selects = config[:default_selects].map(&method(:build_select))
      joins = config[:default_joins].map(&method(:build_join))
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

    # Do we like this? I dont think so...
   # TODO send back a more specific error message if the page is invalid? Shorten the param keys?
    # right now, if you request an out of bound page, it responds with an empty data field! THIS IS BAD
    def self.paginate (query, params, meta)
      if  params[:page]
        if params[:perpage]
          query = query.page(params[:page]).per(params[:perpage])
        else
          query = query.page(params[:page])
        end
        
        meta = meta.merge!({
          paginated: true,
          cur_page: params[:page].to_i, # TODO sanitization?
          per_page: query.size,
          count: query.size
        })
        return meta, query
      else 
        return meta, query
      end
    end
end
