Rails.application.routes.draw do
  root 'landing#index'
  resources :images, only: [:new, :create, :show]
end
