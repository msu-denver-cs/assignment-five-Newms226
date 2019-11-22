Rails.application.routes.draw do
  root 'cars#index'

  devise_for :users

  get 'about/creator'
  get 'about/assignments'
  get 'about/resume'

  get 'spa', to: 'spa#index'

  get 'api/status'
  scope '/api' do
    resources :cars
  end

  resources :parts do
    get :autocomplete_part_name, on: :collection

    collection do
      get 'search'
    end
  end

  resources :makes do
    get :autocomplete_make_name, on: :collection

    collection do
      get 'search'
    end
  end

  resources :cars do
    get :autocomplete_car_model, on: :collection

    collection do
      get 'search'
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
