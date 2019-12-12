require 'pry'

class CarsController < ApplicationController
  before_action :set_car, only: [:show, :update, :destroy]
  before_action :authenticate_user!, except: [:show, :index]

  # GET /cars
  def index
    @meta, @cars = Car.api_query search_params
    render 'cars/index.json'
  end

  # GET /cars/1
  def show
    render 'cars/show.json'
  end

  # POST /cars
  def create
    @car = Car.new(car_params)

    # binding.pry
    if @car.save
      render :show, status: :created, location: @make
    else
      render json: @car.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /cars/1
  def update
    if @car.update(car_params)
      render :show, location: @make
    else
      render json: @car.errors, status: :unprocessable_entity
    end
  end

  # DELETE /cars/1
  def destroy
    @car.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_car
      @car = Car.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def car_params
      params.require(:car).permit(:model, :make_id, :vin, :part_ids => [])
    end

    def search_params
      params.permit(:model, :make, :vin, :part, :order, :page, :desc, :perpage)
    end

end
