class SpaController < ApplicationController
    def index
        @cars = Car.index params
        @parts = Part.index params
        @makes = Make.index params
    end
end
