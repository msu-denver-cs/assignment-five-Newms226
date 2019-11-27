json.extract! car, :id, :model, :vin, :created_at, :updated_at
json.make do
  json.name car.make_name
  json.id car.make_id
end
json.parts car.parts_names_ids
