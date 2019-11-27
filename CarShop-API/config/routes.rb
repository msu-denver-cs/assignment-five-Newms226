Rails.application.routes.draw do
  get 'api/status'
  root 'cars#index'

  scope :api do
    resources :makes, :parts, :cars
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
