module MakesHelper
  def get_make_order_url(order_by)
    if request.path == makes_path
      makes_url(order: order_by)
    else
      search_makes_url pick_apart_search(order_by)
    end
  end

  private
    def pick_apart_search(order_by)
      {
          order: order_by,
          name: params[:name] || '',
          commit: 'Search',
          utf8: '✓'
      }
    end
end
