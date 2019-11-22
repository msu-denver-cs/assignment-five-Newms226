require 'test_helper'

class ApiControllerTest < ActionDispatch::IntegrationTest
  test "should get status" do
    get api_status_url
    assert_response :success
  end

end
