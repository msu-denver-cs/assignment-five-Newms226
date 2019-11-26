require 'test_helper'

class PartTest < ActiveSupport::TestCase
  test "should require a name" do
    part = Part.new
    refute part.valid?
    assert_equal part.errors.messages, {:name=>["can't be blank"]}

    part.name = "my name"
    assert part.valid?
    assert part.save
  end

  test 'should be searchable by name' do
    results = Part.query name: 'Wheel'
    expected = [parts(:sport_wheel), parts(:wheel)]
    assert_equal expected, results
  end

  test 'should return index, sorted by name' do
    results = Part.index
    expected = [parts(:sport_wheel), parts(:tire), parts(:wheel)]
    assert_equal expected, results
  end

  # API Tests

  test 'API: should respond to search by name' do

  end

  test 'API: should respond to desc' do
    # do we even want to do this?
  end
end
