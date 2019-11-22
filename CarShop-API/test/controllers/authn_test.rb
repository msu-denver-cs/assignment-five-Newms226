require 'test_helper'

module AuthnTests
  class CarAuthnTest < ActionDispatch::IntegrationTest
    include Devise::Test::IntegrationHelpers

    setup do
      @car = cars(:my_car)
      assert_signed_out
    end

    test "should load the index when the user isn't signed in" do
      get cars_url
      assert_response :success
    end

    test "should refuse editing when the user isn't signed in" do
      get edit_car_url(@car)
      assert_redirected_to new_user_session_url

      assert_no_difference('Car.count') do
        post cars_url, params: { car: { make_id: @car.make_id, model: @car.model, vin: 10 } }
        assert_redirected_to new_user_session_url
      end
    end

    test "shouldn't destroy car when not signed in" do
      assert_no_difference('Car.count') do
        delete car_url(@car)
        assert_redirected_to new_user_session_url
      end
    end

    test "shouldn't create car when not signed in" do
      assert_no_difference('Car.count') do
        post cars_url, params: { car: { make_id: @car.make_id, model: @car.model, vin: 10 } }
      end

      assert_redirected_to new_user_session_url
    end
  end

  class PartAuthnTest < ActionDispatch::IntegrationTest
    include Devise::Test::IntegrationHelpers

    setup do
      @part = parts(:wheel)
      assert_signed_out
    end

    test "should load the index when the user isn't signed in" do
      get parts_url
      assert_response :success
    end

    test "should refuse editing when the user isn't signed in" do
      get edit_part_url(@part)
      assert_redirected_to new_user_session_url

      assert_no_difference('Part.count') do
        post cars_url, params: { part: {name: "new name"} }
        assert_redirected_to new_user_session_url
      end
    end

    test "shouldn't destroy part when not signed in" do
      assert_no_difference('Part.count') do
        delete part_url(@part)
        assert_redirected_to new_user_session_url
      end
    end

    test "shouldn't create part when not signed in" do
      assert_no_difference('Part.count') do
        post cars_url, params: { part: {name: "new name"} }
      end

      assert_redirected_to new_user_session_url
    end
  end

  class MakeAuthnTest < ActionDispatch::IntegrationTest
    include Devise::Test::IntegrationHelpers

    setup do
      @make = makes(:audi)
      assert_signed_out
    end

    test "should load the index when the user isn't signed in" do
      get makes_url
      assert_response :success
    end

    test "should refuse editing when the user isn't signed in" do
      get edit_make_url(@make)
      assert_redirected_to new_user_session_url

      assert_no_difference('Make.count') do
        post cars_url, params: { make: {name: "new name", country: "new country"} }
        assert_redirected_to new_user_session_url
      end
    end

    test "shouldn't destroy make when not signed in" do
      assert_no_difference('Make.count') do
        delete make_url(@make)
        assert_redirected_to new_user_session_url
      end
    end

    test "shouldn't create make when not signed in" do
      assert_no_difference('Make.count') do
        post cars_url, params: { make: {name: "new name", country: "new country"} }
      end

      assert_redirected_to new_user_session_url
    end
  end
end