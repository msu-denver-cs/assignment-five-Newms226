require 'test_helper'

class PartsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @part = parts(:wheel)
    sign_in users(:one)
  end

  test "should find a part that exists" do
    get search_parts_url, params: {name: "Wheel"}
    assert_select 'td', 'Wheel'
  end

  test "shouldn't find a part that doesnt exist" do
    get search_parts_url, params: {name: "I dont exist"}
    assert_select 'td', false
  end

  # Scaffold Tests

  test "should get index" do
    get parts_url
    assert_response :success
  end

  test "should get new" do
    get new_part_url
    assert_response :success
  end

  test "should create part" do
    assert_difference('Part.count') do
      post parts_url, params: { part: { name: @part.name } }
    end

    assert_redirected_to part_url(Part.last)
  end

  test "should show part" do
    get part_url(@part)
    assert_response :success
  end

  test "should get edit" do
    get edit_part_url(@part)
    assert_response :success
  end

  test "should update part" do
    patch part_url(@part), params: { part: { name: @part.name } }
    assert_redirected_to part_url(@part)
  end

  test "should destroy part" do
    assert_difference('Part.count', -1) do
      delete part_url(@part)
    end

    assert_redirected_to parts_url
  end
end
