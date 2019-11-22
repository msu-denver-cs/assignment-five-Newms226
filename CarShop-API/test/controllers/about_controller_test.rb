require 'test_helper'

class AboutControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    sign_in users(:one)
  end

  test "should get creator" do
    get about_creator_url
    assert_response :success
  end

  test "should get assignments" do
    get about_assignments_url
    assert_response :success
  end

end
