module CarsHelper

  def get_car_order_url(order_by)
    if cars_path? request.path
      cars_url(order: order_by)
    else
      search_cars_url pick_apart_car_search(order_by)
    end
  end

  private
    def pick_apart_car_search(order_by)
      {
          order: order_by,
          make: params[:make] || '',
          model: params[:model] || '',
          vin: params[:vin] || '',
          part: params[:part] || '',
          commit: 'Search',
          utf8: '✓'
      }
    end
end
