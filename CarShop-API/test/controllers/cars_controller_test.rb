require 'test_helper'

class CarsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @car = cars(:my_car)
    sign_in users(:one)
  end

  # Custom Tests

  test "should find a car that exists" do
    get search_cars_url, params: {model: "Q5"}
    assert_select 'td', 'Q5'
  end

  test "shouldn't find a car that doesnt exist" do
    get search_cars_url, params: {model: "I dont exist"}
    assert_select 'td', false
  end

  test 'should return correct json' do
    car = cars(:my_car)
    get cars_url(format: :json)
    assert_response :success

    additions = {
        'make_name' => 'Audi',
        'parts' => ['Wheel'],
        'url' => car_url(car, format: :json)
    }

    act = JSON.parse(response.body)[0]
    exp = JSON.parse(car.to_json).merge! additions

    assert_equal exp, act
  end

  # Scaffold Tests

  test "should get index" do
    get cars_url
    assert_response :success
  end

  test "should get new" do
    get new_car_url
    assert_response :success
  end

  test "should create car" do
    assert_difference('Car.count') do
      post cars_url, params: { car: { make_id: @car.make_id, model: @car.model, vin: 10 } }
    end

    assert_redirected_to car_url(Car.last)
  end

  # test "shouldn't create a car if the make does not exist" do
  #   assert_no_difference('Car.count') do
  #     post cars_url, params: { car: { make_id: "not a valid make", model: @car.model, vin: 4 } }
  #   end
  #
  #   # assert_redirected_to car_url(Car.last)
  #
  #   # post car
  #   # car = Car.create(model: "model", vin: 400, make: "not a valid make")
  #   # refute car.valid?
  # end

  test "should show car" do
    get car_url(@car)
    assert_response :success
  end

  test "should get edit" do
    get edit_car_url(@car)
    assert_response :success
  end

  test "should update car" do
    patch car_url(@car), params: { car: { make_id: @car.make_id, model: @car.model, vin: @car.vin } }
    assert_redirected_to car_url(@car)
  end

  test "should destroy car" do
    assert_difference('Car.count', -1) do
      delete car_url(@car)
    end

    assert_redirected_to cars_url
  end
end
