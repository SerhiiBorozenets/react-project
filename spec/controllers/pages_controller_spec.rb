require 'rails_helper'
require 'shared_contexts'

RSpec.describe PagesController, :type => :controller do
  describe 'GET #home' do
    it 'renders home.html' do
      get :home
      expect(response).to have_http_status(:ok)
    end
  end
  describe 'GET #app' do
    it 'renders app.html' do
      get :app
      expect(response).to have_http_status(:found)
    end
  end
end
