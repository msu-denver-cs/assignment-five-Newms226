require 'test_helper'

class MakeTest < ActiveSupport::TestCase

  # Validation Tests

  test "shouldn't be valid without a name" do
    make = Make.create(country: "my country")
    refute make.valid?

    assert_equal make.errors.messages, {:name=>["can't be blank"]}
  end

  test "shouldn't be valid without a country" do
    make = Make.create(name: "my name")
    refute make.valid?


    assert_equal make.errors.messages, {:country=>["can't be blank"]}
  end

  test "should be valid with a name and a country" do
    make = Make.create(name: "my name", country: "my country")
    assert make.valid?
    assert make.save
  end

  # Search Tests

  test 'should be sorted by name by default' do
    _, actual = Make.api_query
    assert_equal [makes(:audi), makes(:bmw), makes(:ford), makes(:ram), makes(:toyota), makes(:zeo)], actual

    _, actual = Make.api_query name: 'o'
    assert_equal [makes(:ford), makes(:toyota), makes(:zeo)], actual
  end

  test 'should sort by country name' do
    _, actual = Make.api_query order: 'country'
    exp = [makes(:zeo), makes(:audi), makes(:bmw), makes(:toyota), makes(:ram), makes(:ford)]
    assert_equal exp, actual

    _, actual = Make.api_query name: 'o', order: 'country'
    assert_equal [makes(:zeo), makes(:toyota), makes(:ford)], actual
  end

  test 'should allow searching by make name' do
    _, actual = Make.api_query name: 'o'
    assert_equal [makes(:ford), makes(:toyota), makes(:zeo)], actual
  end
end
