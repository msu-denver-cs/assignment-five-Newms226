require "test_helper"

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :selenium, using: :chrome, screen_size: [1400, 1400]

  def sign_in
    visit cars_url
    click_button 'Sign In'
    fill_in "Email", with: 'test@test.com'
    fill_in 'Password', with: 'test123'
    click_button 'Log In'
  end
end
