json.extract! car, :id, :make_id, :model, :vin, :created_at, :updated_at
json.make_name Make.find_by_id(car.make_id).name
json.parts car.parts.map(&:name)
json.url car_url(car, format: :json)
