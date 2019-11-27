require 'test_helper'

class QueryGeneratorTest < ActiveSupport::TestCase

  setup do
    Kaminari.configure do |config|
      config.default_per_page = 5
    end
  end

  def index
    Car.select('cars.*, makes.name').joins(:make).order('makes.name, cars.model')
  end

  test 'should generate index' do
    _, query = Car.api_query
    exp = index

    assert Car.all.size, exp.size
    assert_equal exp.to_a, query.to_a
  end

  test 'should paginate index' do
    meta, query = Car.api_query page: 1

    assert meta[:paginated]
    assert meta[:total] == 6
    assert meta[:cur_page] == 1
    assert meta[:per_page] == 5
    assert meta[:count] == 5

    exp = index.to_a.take(5)
    assert_equal exp, query.to_a

    meta, query = Car.api_query page: 2

    assert meta[:paginated]
    assert meta[:total] == 6
    assert meta[:cur_page] == 2
    assert meta[:per_page] == 5
    assert meta[:count] == 1

    exp = index.to_a[5]
    assert query.size == 1
    assert_equal exp, query.to_a[0]
  end

  test 'should allow ordering' do
    # Vin test
    meta, query = Car.api_query({order: 'vin'})
    exp = Car.all.order(:vin).to_a

    assert_equal Car.all.size, meta[:total]
    assert_equal exp, query.to_a

    # Model test
    meta, query = Car.api_query({order: 'model'})
    exp = Car.all.order(:model).to_a

    assert_equal Car.all.size, meta[:total]
    assert_equal exp, query.to_a
  end

  test 'should be sorted by default using config values' do
    _, query = Car.api_query
    exp = index

    assert_equal exp.to_a, query.to_a
  end

  test 'should allow searching, sorting, and pagination' do
    Kaminari.configure do |config|
      config.default_per_page = 2
    end

    meta, query = Car.api_query part: 'tire', order: 'vin', page: 1

    assert meta[:paginated]
    assert meta[:total] == 4
    assert meta[:cur_page] == 1
    assert meta[:per_page] == 2
    assert meta[:count] == 2

    exp = [cars(:prius), cars(:blue_truck), cars(:q7_rental), cars(:bmw_q5)]
    assert_equal exp.take(2), query.to_a

    meta, query = Car.api_query part: 'tire', order: 'vin', page: 2

    assert meta[:paginated]
    assert meta[:total] == 4
    assert meta[:cur_page] == 2
    assert meta[:per_page] == 2
    assert meta[:count] == 2
    assert_equal exp[2..4], query.to_a
  end

  test 'should respond to desc' do
    _, query = Car.api_query({order: 'vin', desc: 'true'})
    exp = Car.all.order(:vin).to_a.reverse

    assert_equal exp, query.to_a
  end

  test 'should find items which do not exist in a join table' do
    car = cars(:no_part)
    meta, query = Car.api_query({make: 'BMW', model: '3 series'})

    assert_equal 1, meta[:total]
    assert query.to_a.include? car
  end

  test 'should return distinct results' do
    exp = Car.all.size

    meta, query = Car.api_query({})

    assert_equal exp, meta[:total]
    assert_equal exp, query.size

    exp = 2
    meta, query = Car.api_query({make: 'Audi'})
    assert_equal exp, meta[:total]
    assert_equal exp, query.size

    exp = 1
    meta, query = Car.api_query({part: 'Wheel', model: 'Prius'})
    assert_equal exp, meta[:total]
    assert_equal exp, query.size
  end

  test 'should respond to partial queries' do
    _, query = Car.api_query make: 'udi', model: '5'
    assert_equal [cars(:my_car)], query.to_a
  end

  test 'should be insensitive to capitalization' do
    _, query = Car.api_query make: 'AuDI', model: 'q5'
    assert_equal [cars(:my_car)], query.to_a
  end
end