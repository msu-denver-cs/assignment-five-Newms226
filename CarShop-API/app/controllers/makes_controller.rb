class MakesController < ApplicationController
  before_action :set_make, only: [:show, :update, :destroy]

  # GET /makes
  def index
    @meta, @makes = Make.api_query search_params
    render 'makes/index.json'
  end

  # GET /makes/1
  def show
    render json: @make
  end

  # POST /makes
  def create
    @make = Make.new(make_params)

    if @make.save
      render json: @make, status: :created, location: @make
    else
      render json: @make.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /makes/1
  def update
    if @make.update(make_params)
      render json: @make
    else
      render json: @make.errors, status: :unprocessable_entity
    end
  end

  # DELETE /makes/1
  def destroy
    @make.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_make
      @make = Make.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def make_params
      params.require(:make).permit(:name, :country)
    end

    def search_params
      params.permit(:name, :country, :order, :page, :desc, :perpage)
    end
end
