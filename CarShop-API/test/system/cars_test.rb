require "application_system_test_case"
require 'pry'

class CarsTest < ApplicationSystemTestCase
  include Warden::Test::Helpers

  setup do
    @car = cars(:my_car)
    user = users(:one)
    login_as(user, :scope => :user)
  end

  def extract_hash(path)
    query = path.split('?')[1]
    parts = query.split('&')
    a = parts.map {|sub| a = sub.split('='); a << '' if a.length == 1; a }
    a.to_h
  end

  test 'Sorting links should always render correctly, regardless of redirect' do
    visit cars_url
    click_on 'Make'
    assert_current_path cars_path(order: 'make')

    visit parts_url
    visit cars_url
    click_on 'Make'
    assert_current_path cars_path(order: 'make')

    visit search_cars_url
    fill_in 'make', with: 'Audi'
    click_on 'Search'
    assert_current_path search_cars_path, ignore_query: true
    click_on 'Make'
    assert_current_path search_cars_path, ignore_query: true
    click_on 'Model'
    assert_current_path search_cars_path, ignore_query: true

    visit cars_url
    click_on 'Make'
    assert_current_path cars_path(order: 'make')

    visit parts_url
    visit search_cars_url
    fill_in 'make', with: 'Audi'
    click_on 'Search'
    assert_current_path search_cars_path, ignore_query: true
    click_on 'Make'
    assert_current_path search_cars_path, ignore_query: true
  end


  # Scaffold Tests

  test "visiting the index" do
    visit cars_url
    assert_selector "h1", text: "Cars"
  end

  test "creating a Car" do
    visit cars_url
    click_on "New Car"

    fill_in "Model", with: @car.model
    fill_in "Vin", with: 1000
    select 'Audi', from: 'Make'
    click_on "Create Car"

    assert_text "Car was successfully created"
    click_on "Back"
  end

  test "updating a Car" do
    visit cars_url
    click_on "Edit", match: :first

    select 'Audi', from: 'Make'
    fill_in "Model", with: @car.model
    fill_in "Vin", with: @car.vin
    click_on "Update Car"

    assert_text "Car was successfully updated"
    click_on "Back"
  end

  test "destroying a Car" do
    visit cars_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Car was successfully destroyed"
  end
end
