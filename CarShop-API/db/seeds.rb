# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
#
# Make to Country list: https://naijadriva.wordpress.com/2018/11/24/countries-of-origin-of-car-brands/


# https://gist.github.com/arjunvenkat/1115bc41bf395a162084

require 'csv'
require 'set'

# Delete current database
Car.all.each(&:delete)
Make.all.each(&:delete)
Part.all.each(&:delete)
User.all.each(&:delete)

puts 'Deleted past data'

csv_text = File.read(Rails.root.join('lib', 'seeds', 'vehicles.csv'))
csv = CSV.parse(csv_text, headers: true, encoding: 'ISO-8859-1')

parts_file = File.readlines(Rails.root.join('lib', 'seeds', 'parts.txt'))
parts_line = parts_file[0]

parts = Set.new
# Weird formatting issue with beginning white space. Simply stripping the lines out
parts_line.split(',').each { |part| parts << part unless part.match? /^\s\w/ }
parts.each do |part_name|
  new_part = Part.create(name: part_name)
  new_part.save!
end

puts 'Seeded Parts'


lookup_lines = File.readlines(Rails.root.join('lib', 'seeds', 'makes.txt'))
makes = lookup_lines.map do |line|
  split = line.split /( – )/
  # puts split[0]
  # puts split[2]
  make = split[0].strip
  country = split[2].strip
  # puts make
  # puts country
  new_make = Make.create(name: make, country: country)
  new_make.save!
  make
end

puts 'Seeded Makes'

unique_make_model = Set.new
max_part_count = 10
part_count = parts.count
parts = parts.to_a
cur_vin = 0

csv.each do |row|
  make = row['make']
  model = row['model']

  if makes.include? make and not unique_make_model.include? [ make, model ]
    ran_parts = []
    rand(max_part_count).times {
      ran_id = rand(part_count)
      ran_parts << Part.find_by_name(parts[ran_id])
    }

    new_car = Car.create(make: Make.find_by_name(make), model: model, vin: cur_vin)
    ran_parts.each { |part| new_car.parts.push(part) }
    new_car.save!

    cur_vin += 1
    unique_make_model << [ row['make'], row['model'] ]
  end
end

puts 'Seeded Cars'

user = User.new
user.email = 'test@test.com'
user.password = 'test123'
user.password_confirmation = 'test123'
user.save!