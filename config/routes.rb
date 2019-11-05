Rails.application.routes.draw do
  root 'landing#index'
  resources :images, only: %i[new create show]
end
