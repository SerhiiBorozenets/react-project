require 'rails_helper'
require 'shared_contexts'

RSpec.describe Api::V1::ProjectsController, :type => :controller do
  let!(:user) { create :user }
  let!(:project) { attributes_for :project, user_id: user.id }

  subject { post :create, params: { project: project, format: :json } }

  before(:each) do
    sign_in(user)
  end

  describe "GET index" do
    it "has a 200 status code" do
      get :index
      expect(response.status).to eq(200)
    end
  end

  describe "responds to" do
    it "responds to json formats when provided in the params" do
      subject
      expect(response.media_type).to eq "application/json"
    end
  end

  describe "POST" do
    it "creates a Project with data" do
      subject

      project_saved = Project.find_by(title: project[:title])
      expect([JSON.parse(response.body)]).to eq [{
                                                   "data"=>
                                                     {
                                                       "id" => project_saved.id.to_s,
                                                       "type" => "project",
                                                       "attributes" =>
                                                         {
                                                           "id" => project_saved.id,
                                                           "title" => project_saved.title,
                                                           "user_id" => user.id,
                                                           "slug" => project_saved.slug,
                                                           "tasks_count" => project_saved.tasks.length,
                                                           "due_date"=> project_saved.due_date,
                                                           "progress"=> project_saved.progress.to_s
                                                         },
                                                       "relationships" =>
                                                         {
                                                           "tasks" =>
                                                             {
                                                               "data" =>[]
                                                             }
                                                         }
                                                     },
                                                   "included" => []
                                                 }]
    end
  end

  describe "PATCH" do
    it "updates a Project and returns data" do
      project = Project.create(title: Faker::Hobby.activity, user_id: user.id)
      patch :update, params: { project: { title: "New title", user_id: user.id }, format: :json, slug: project.slug }
      expect([JSON.parse(response.body)]).to eq [{
                                                   "data"=>
                                                     {
                                                       "id" => project.id.to_s,
                                                       "type" => "project",
                                                       "attributes" =>
                                                         {
                                                           "id" => project.id,
                                                           "title" => "New title",
                                                           "user_id" => user.id,
                                                           "slug" => project.slug,
                                                           "tasks_count" => project.tasks.length,
                                                           "due_date"=> project.due_date,
                                                           "progress"=> project.progress.to_s
                                                         },
                                                       "relationships" =>
                                                         {
                                                           "tasks" =>
                                                             {
                                                               "data" =>[]
                                                             }
                                                         }
                                                     },
                                                   "included" => []
                                                 }]
    end
  end

  describe "DELETE" do
    it "removes project" do
      project = Project.create(title: Faker::Hobby.activity, user_id: user.id)
      expect { delete :destroy, params: { slug: project.slug } }.to change(Project, :count).by(-1)
    end
  end
end
