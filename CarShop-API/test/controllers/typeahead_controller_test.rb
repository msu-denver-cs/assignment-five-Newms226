require 'test_helper'

class TypeaheadControllerTest < ActionDispatch::IntegrationTest
  test "should get cars" do
    get typeahead_cars_url
    assert_response :success
  end

  test "should get parts" do
    get typeahead_parts_url
    assert_response :success
  end

  test "should get makes" do
    get typeahead_makes_url
    assert_response :success
  end

end
