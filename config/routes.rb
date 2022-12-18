Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  namespace :api do
    namespace :v1 do
      resources :projects, param: :slug
      resources :tasks, only: [:create, :destroy, :update]
    end
  end

  devise_for :user, controllers: {
    omniauth_callbacks: 'users/omniauth_callbacks'
  }

  devise_scope :user do
    authenticated :user do
      get '/', to: 'pages#app'
      get '/*undefined', to: redirect('/')
    end
    unauthenticated do
      get '*path', to: 'pages#home', via: :all
    end
  end

  root 'pages#home'
end
