require 'test_helper'

class MakesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @make = makes(:one)
  end

  test "should get index" do
    get makes_url, as: :json
    assert_response :success
  end

  test "should create make" do
    assert_difference('Make.count') do
      post makes_url, params: { make: { country: @make.country, name: @make.name } }, as: :json
    end

    assert_response 201
  end

  test "should show make" do
    get make_url(@make), as: :json
    assert_response :success
  end

  test "should update make" do
    patch make_url(@make), params: { make: { country: @make.country, name: @make.name } }, as: :json
    assert_response 200
  end

  test "should destroy make" do
    assert_difference('Make.count', -1) do
      delete make_url(@make), as: :json
    end

    assert_response 204
  end
end
