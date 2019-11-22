require "application_system_test_case"

class SearchTest < ApplicationSystemTestCase
  include Warden::Test::Helpers

  # setup do
  #   login_as(users(:one), :scope => :user)
  # end

  test 'should allow sorting after searching cars' do
    visit cars_url
    fill_in 'model', with: 'Q5'
    click_on 'Search'

    assert_selector 'td', text: 'BMW', match: :first
    assert_selector 'td', text: 'Audi', match: :first
    assert_no_selector 'td', text: 'Ford'

    click_on 'Model'
    assert_selector 'td', text: 'BMW', match: :first
    assert_selector 'td', text: 'Audi', match: :first
    assert_no_selector 'td', text: 'Ford'
  end

  test 'should allow searching for parts' do
    visit parts_url
    fill_in 'name', with: 'wheel'
    click_on 'Search'

    assert_selector 'td', text: 'Wheel'
    assert_selector 'td', text: 'Sport Wheel'
    assert_no_selector 'td', text: 'Tire'
  end

  test 'should allow sorting after searching by make name' do
    visit makes_url
    fill_in 'name', with: 'o'
    click_on 'Search'

    assert_selector 'td', text: 'Ford'
    assert_selector 'td', text: 'Toyota'
    assert_no_selector 'td', text: 'BMW'

    click_on 'Country'
    assert_selector 'td', text: 'Ford'
    assert_selector 'td', text: 'Toyota'
    assert_no_selector 'td', text: 'BMW'
  end
end