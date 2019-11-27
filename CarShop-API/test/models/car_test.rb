require 'test_helper'

class CarTest < ActiveSupport::TestCase

  # Validation tests

  test "should create a car with a unique VIN and all fields present" do
    car = Car.create(model: "model", vin: 400, make: makes(:audi))
    assert car.valid?
    assert car.save
  end

  test "should not allow duplicate VINs" do
    car = Car.create(model: "model", vin: cars(:my_car).vin, make: makes(:audi))
    refute car.valid?

    assert_equal car.errors.messages, {:vin=>["has already been taken"]}
  end

  test "shouldn't allow a non-number VIN" do
    car = Car.create(model: "model", vin: "not a number", make: makes(:audi))
    refute car.valid?

    assert_equal car.errors.messages, {:vin=>["is not a number"]}
  end

  test "should require a VIN" do
    car = Car.create(model: "model", make: makes(:audi))
    refute car.valid?

    assert_equal car.errors.messages, {:vin=>["can't be blank", "is not a number"]}
  end

  test "should require a model" do
    car = Car.create(make: makes(:audi), vin: 400)
    refute car.valid?

    assert_equal car.errors.messages, {:model=>["can't be blank"]}
  end

  test "should require a make" do
    car = Car.create(model: "model", vin: 400)
    refute car.valid?

    assert_equal car.errors.messages, {:make=>["must exist"], :make_id=>["can't be blank"]}
  end

  # Search Tests

  test 'should respond to search by VIN' do
    _, query = Car.api_query vin: 1
    assert_equal [cars(:my_car)], query.to_a

    _, query = Car.api_query vin: 10
    assert_equal [], query.to_a
  end

  test 'should respond to search by model' do
    _, query = Car.api_query model: '3 series'
    assert_equal [cars(:no_part)], query.to_a

    _, query = Car.api_query model: '5 series'
    assert_equal [], query.to_a
  end

  test 'should respond to search by part name' do
    _, query = Car.api_query part: 'wheel'
    assert_equal [cars(:my_car), cars(:prius)], query.to_a

    _, query = Car.api_query part: 'I dont exsit'
    assert_equal [], query.to_a
  end

  test 'should respond to search by make name' do
    _, query = Car.api_query make: 'Audi'
    assert_equal [cars(:my_car), cars(:q7_rental)], query.to_a

    _, query = Car.api_query make: 'I dont exsit'
    assert_equal [], query.to_a
  end

  # Order Tests

  test 'should sort by make by default' do
    _, results = Car.api_query part: 'wheel'
    assert_equal [cars(:my_car), cars(:prius)], results

    _, results = Car.api_query
    exp = [cars(:my_car), cars(:q7_rental), cars(:no_part), cars(:bmw_q5), cars(:blue_truck), cars(:prius)]
    assert_equal exp, results
  end

  test 'should sort by model' do
    _, results = Car.api_query part: 'wheel'
    assert_equal [ cars(:my_car), cars(:prius)], results

    _, results = Car.api_query part: 'wheel', order: 'model'
    assert_equal [cars(:prius), cars(:my_car)], results

    _, results = Car.api_query order: 'model'
    exp = [cars(:no_part), cars(:blue_truck), cars(:prius), cars(:bmw_q5), cars(:my_car), cars(:q7_rental)]
    assert_equal exp, results
  end

  test 'should sort by VIN' do
    _, results = Car.api_query part: 'tire'
    assert_equal [cars(:q7_rental), cars(:bmw_q5), cars(:blue_truck), cars(:prius)], results

    _, results = Car.api_query part: 'tire', order: 'vin'
    assert_equal [cars(:prius), cars(:blue_truck), cars(:q7_rental), cars(:bmw_q5)], results

    _, results = Car.api_query order: 'vin'
    exp = [cars(:my_car), cars(:prius), cars(:blue_truck), cars(:q7_rental), cars(:bmw_q5), cars(:no_part)]
    assert_equal exp, results
  end
end
