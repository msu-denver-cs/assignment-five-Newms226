require 'pry'

module QueryGenerator

  def self.execute (params, init_func, search_keys)
    query = init_func.call

    calls = []
    calls += build_search_calls(params, search_keys )
    calls += build_order_calls(params, search_keys )

    completed_query = run_query(query, calls)
    meta = build_meta(completed_query)



    if params[:page]
      paginate(completed_query, params[:page], meta) # returns meta, query
    else
      return meta, completed_query
    end
  end


  def self.build_search_calls (params, search_keys)
    selects = []
    wheres = []
    joins = []

    search_keys.keys.each do |key|
      if params[key]
        if search_keys[key][:select]
          selects << -> (query) { query.select( search_keys[key][:select] ) }
        end

        if search_keys[key][:join]
          joins << -> (query) { query.joins( search_keys[key][:join]) }
        end

        if search_keys[key][:query]
          wheres << -> (query) { query.where("#{ search_keys[key][:query] } like ?", "%#{params[key]}%") }
        end
      end
    end
    # binding.pry()

    return selects + joins + wheres
  end

  def self.build_order_calls( params, search_keys)

    calls = [-> (query) { query.distinct! }]

    if params[:order] && search_keys[params[:order]]
      calls << -> (query) { query.order(params[:order]) }
    end

    if params[:desc] == 'true'
      calls << -> (query) { query.order(:desc) }
    end

    calls
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
        per_page: 25,
        count: query.size
    })

    return meta, query
  end
end
