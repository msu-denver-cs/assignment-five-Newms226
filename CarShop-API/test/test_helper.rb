ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  def assert_signed_out
    get cars_url
    assert_select "a:match('href', ?)", new_user_session_url
    assert_select "a:match('href', ?)", new_user_registration_url
    assert_select "a:match('href', ?)", destroy_user_session_path, false
  end

  def assert_signed_in
    get cars_url
    assert_select "a:match('href', ?)", new_user_session_url, false
    assert_select "a:match('href', ?)", new_user_registration_url, false
    assert_select "a:match('href', ?)", destroy_user_session_path
  end

  # Add more helper methods to be used by all tests here...
end
