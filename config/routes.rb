Rails.application.routes.draw do
  root 'feedbacks#new'

  resources :feedbacks, only: [:new]

  namespace :api do
    resource :feedbacks, only: [:create]
  end
end
