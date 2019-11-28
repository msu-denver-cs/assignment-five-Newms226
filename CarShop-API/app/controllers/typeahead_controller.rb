class TypeaheadController < ApplicationController
  def cars
    @makes = Make.all.pluck(:name)
    @models = Car.all.pluck(:model).uniq
    @parts = Part.all.pluck(:name)
    @vins = Car.all.pluck(:vin)
    render 'typeahead/cars.json', format: :json
  end

  def parts
  end

  def makes
  end
end
