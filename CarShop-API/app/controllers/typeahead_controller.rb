class TypeaheadController < ApplicationController
  def cars
    @makes = Make.all.pluck(:name)
    @models = Car.all.pluck(:model).uniq
    @parts = Part.all.pluck(:name)

    vins = Car.all.pluck(:vin)
    prev = vins[0];
    @vins = vins.slice_before { |e|
      prev, prev2 = e, prev
      prev2 + 1 != e
    }.map { |es| [es.first, es.last] }

    # p vins
    # render json: vins
    render 'typeahead/cars.json', format: :json
  end

  def parts
  end

  def makes
  end
end
