class ApiController < ApplicationController
  def status
    render json: {status: '200 ok'}
  end
end
