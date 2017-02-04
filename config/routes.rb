Rails.application.routes.draw do

  resources :trips, only: [:new, :show, :index, :create, :edit, :update] do
    resources :markers, only: [:create]
  end
  get '/get_pings' => 'trips#get_pings', defaults: { format: 'json' }

  devise_for :users, controllers: { registrations: 'users/registrations' }

  get '/users/:id', to: 'users/users#show', as: 'user'
  get '/users/:user_id/trips', to: 'users/users#trips_index', as: 'user_trips'

  root 'trips#index'


end
