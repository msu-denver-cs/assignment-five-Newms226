require 'test_helper'

class CarTest < ActiveSupport::TestCase

  # Validation Tests

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

  test 'Should find cars by make name' do
    results = Car.query make: 'Audi'
    assert results.size == 2

    expected = [cars(:my_car), cars(:q7_rental)]

    assert_equal expected, results
  end

  test 'should find cars by part name' do
    results = Car.query part: 'wheel'
    assert results.size == 2

    expected = [cars(:my_car), cars(:prius)]

    assert_equal expected, results
  end

  test 'should find cars by model name' do
    results = Car.query model: 'Q5'
    assert results.size == 2

    expected = [cars(:my_car), cars(:bmw_q5)]

    assert_equal expected, results
  end

  test 'should find cars by VIN' do
    results = Car.query vin: '1'
    assert results.size == 1

    expected = [cars(:my_car)]

    assert_equal expected, results
  end

  test 'should find cars with multiple parameters' do
    results = Car.query make: 'Audi', model: 'Q5', vin: '1'
    assert_equal [cars(:my_car)], results

    results = Car.query make: 'Toyota', model: 'Prius', vin: '2'
    assert_equal [cars(:prius)], results

    results = Car.query make: 'BMW', model: 'Q5', vin: '5'
    assert_equal [cars(:bmw_q5)], results
  end

  test 'should find cars which do not have a part' do
    results = Car.query vin: '6'
    assert_equal [cars(:no_part)], results
  end

  test 'should sort by make by default' do
    results = Car.query part: 'wheel'
    assert_equal [cars(:my_car), cars(:prius)], results

    results = Car.index
    exp = [cars(:my_car), cars(:q7_rental), cars(:no_part), cars(:bmw_q5), cars(:blue_truck), cars(:prius)]
    assert_equal exp, results
  end

  test 'should sort by model' do
    results = Car.query part: 'wheel'
    assert_equal [ cars(:my_car), cars(:prius)], results

    results = Car.query part: 'wheel', order: 'model'
    assert_equal [cars(:prius), cars(:my_car)], results

    results = Car.index order: 'model'
    exp = [cars(:no_part), cars(:blue_truck), cars(:prius), cars(:my_car), cars(:bmw_q5), cars(:q7_rental)]
    assert_equal exp, results
  end

  test 'should sort by VIN' do
    results = Car.query part: 'tire'
    assert_equal [cars(:q7_rental), cars(:bmw_q5), cars(:blue_truck), cars(:prius)], results

    results = Car.query part: 'tire', order: 'vin'
    assert_equal [cars(:prius), cars(:blue_truck), cars(:q7_rental), cars(:bmw_q5)], results

    results = Car.index order: 'vin'
    exp = [cars(:my_car), cars(:prius), cars(:blue_truck), cars(:q7_rental), cars(:bmw_q5), cars(:no_part)]
    assert_equal exp, results
  end

end
