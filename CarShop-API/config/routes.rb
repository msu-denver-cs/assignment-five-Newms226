Rails.application.routes.draw do
  get 'api/typeahead/cars', to: 'typeahead#cars'
  get 'api/typeahead/parts', to: 'typeahead#parts'
  get 'api/typeahead/makes', to: 'typeahead#makes'

  get 'api/status'
 
  root 'cars#index'

  scope :api do
    resources :makes, :parts, :cars
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
