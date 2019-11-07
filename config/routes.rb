Rails.application.routes.draw do
  root 'feedbacks#new'

  resources :feedbacks, only: [:new]
end
