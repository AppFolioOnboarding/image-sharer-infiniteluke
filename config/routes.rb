Rails.application.routes.draw do
  root 'images#index'
  resources :images, only: %i[new create show index destroy]
  resources :feedbacks, only: [:new]

  namespace :api do
    resource :feedbacks, only: [:create]
  end
end
