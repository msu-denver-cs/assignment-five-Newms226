require 'test_helper'

class PartTest < ActiveSupport::TestCase

  # Validation tests

  test "should require a name" do
    part = Part.new
    refute part.valid?
    assert_equal part.errors.messages, {:name=>["can't be blank"]}

    part.name = "my name"
    assert part.valid?
    assert part.save
  end

  # Search tests

  test 'should be searchable by name' do
    _, results = Part.api_query name: 'Wheel'
    expected = [parts(:sport_wheel), parts(:wheel)]
    assert_equal expected, results
  end

  test 'should return index, sorted by name' do
    _, results = Part.api_query
    expected = [parts(:sport_wheel), parts(:tire), parts(:wheel)]
    assert_equal expected, results
  end
end
