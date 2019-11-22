require 'test_helper'

class MakesControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @make = makes(:audi)
    sign_in users(:one)
  end

  test "should find a make that exists" do
    get search_makes_url, params: {name: "Audi"}
    assert_select 'td', 'Audi'
  end

  test "shouldn't find a make that doesnt exist" do
    get search_makes_url, params: {name: "I dont exist"}
    assert_select 'td', false
  end

  # Scaffold Tests

  test "should get index" do
    get makes_url
    assert_response :success
  end

  test "should get new" do
    get new_make_url
    assert_response :success
  end

  test "should create make" do
    assert_difference('Make.count') do
      post makes_url, params: { make: { country: "New Country", name: "New Make" } }
    end

    assert_redirected_to make_url(Make.last)
  end

  test "should show make" do
    get make_url(@make)
    assert_response :success
  end

  test "should get edit" do
    get edit_make_url(@make)
    assert_response :success
  end

  test "should update make" do
    patch make_url(@make), params: { make: { country: @make.country, name: @make.name } }
    assert_redirected_to make_url(@make)
  end

  test "should destroy make" do
    assert_difference('Make.count', -1) do
      delete make_url(@make)
    end

    assert_redirected_to makes_url
  end
end
