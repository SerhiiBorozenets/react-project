require 'rails_helper'
require 'shared_contexts'

RSpec.describe Api::V1::ProjectsController, :type => :controller do
  let!(:project_attr) { attributes_for :project, user_id: user.id }
  let!(:project) {create :project }
  let(:user) { project.user }

  before(:each) do |test|
    sign_in(user) unless test.metadata[:logged_out]
  end

  it ':project factory works' do
    expect(project).to be_valid
  end

  describe "GET index" do
    it "has a 200 status code with json format" do
      get :index, params: { format: 'json' }
      expect(response.status).to eq(200)
    end
    it "has a 200 status code with zip format" do
      get :index, params: { format: 'zip' }
      expect(response.status).to eq(200)
    end
    it "has a 401 status code for non sigh_in user", :logged_out do
      get :index
      expect(response.status).to eq(401)
    end
  end

  describe "POST" do
    subject { post :create, params: { project: project_attr, format: :json } }

    before(:each) do
      subject
    end

    it "responds to json formats when provided in the params" do
      expect(response.media_type).to eq "application/json"
    end

    it "creates a Project with data" do
      project_saved = Project.find_by(title: project_attr[:title])
      expect([JSON.parse(response.body)]).to eq [{
                                                   "data"=>
                                                     {
                                                       "id" => project_saved.id.to_s,
                                                       "type" => "project",
                                                       "attributes" =>
                                                         {
                                                           "id" => project_saved.id,
                                                           "title" => project_saved.title,
                                                           "user_id" => project_saved.user.id,
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
    it "not allow create project for non sigh_in user", :logged_out do
      expect([JSON.parse(response.body)]).to eq [{"error" => "You need to sign in or sign up before continuing."}]
      expect { subject }.to change(Project, :count).by(0)
    end
  end

  describe "PATCH" do
    subject { patch :update, params: { project: { title: "New title", user_id: user.id }, format: :json, slug: project.slug } }

    before(:each) do
      subject
    end

    it "updates a Project and returns data" do
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
    it "not allow update projects for non sigh_in user", :logged_out do
      expect([JSON.parse(response.body)]).to eq [{"error" => "You need to sign in or sign up before continuing."}]
    end
  end

  describe "DELETE" do
    subject { delete :destroy, params: { slug: project.slug } }
    it "removes project" do
      expect { subject }.to change(Project, :count).by(-1)
    end
    it "not allow deleted projects for non sigh_in user", :logged_out do
      expect { subject }.to change(Project, :count).by(0)
    end
  end
end
