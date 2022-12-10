require 'rails_helper'
require 'shared_contexts'

RSpec.describe Api::V1::TasksController, :type => :controller do
  let!(:project) {create :project }
  let(:user) { project.user }
  let!(:task) { attributes_for :task, project_id: project.id }
  let!(:task2) { create :task, project_id: project.id }

  subject { post :create, :params => { task: task, project_id: project.id, format: :json } }

  before(:each) do
    sign_in(user)
  end

  it ':project factory works' do
    expect(project).to be_valid
  end

  it ':task factory works' do
    expect(task2).to be_valid
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
      task_saved = Task.find_by(title: task[:title])
      expect([JSON.parse(response.body)]).to eq [{
                                                   "data"=>
                                                     {
                                                       "id" => task_saved.id.to_s,
                                                       "type" => "task",
                                                       "attributes" =>
                                                         {
                                                           "id" => task_saved.id,
                                                           "title" =>task_saved.title,
                                                           "status" => task_saved.status,
                                                           "completed" => task_saved.completed,
                                                           "due_date" => task_saved.due_date.strftime('%Y-%m-%d'),
                                                           "project_id"=> task_saved.project_id,
                                                           "complexity"=> task_saved.complexity
                                                         },
                                                       "relationships" =>
                                                         {
                                                           "project" =>
                                                             {
                                                               "data" => {
                                                                 "id" => task_saved.project_id.to_s,
                                                                 "type" => "project"
                                                               }
                                                             }
                                                         }
                                                     }
                                                 }]
    end
  end

  describe "PATCH" do
    it "updates a Task and returns data" do
      post :update, :params => { task: { title: "New task title", completed: !task2.completed, project_id: project.id }, id: task2.id, format: :json }
      expect([JSON.parse(response.body)]).to eq [{
                                                   "data"=>
                                                     {
                                                       "id" => task2.id.to_s,
                                                       "type" => "task",
                                                       "attributes" =>
                                                         {
                                                           "id" => task2.id,
                                                           "title" => "New task title",
                                                           "status" => task2.status,
                                                           "completed" => !task2.completed,
                                                           "due_date" => task2.due_date.strftime('%Y-%m-%d'),
                                                           "project_id"=> task2.project_id,
                                                           "complexity"=> task2.complexity
                                                         },
                                                       "relationships" =>
                                                         {
                                                           "project" =>
                                                             {
                                                               "data" => {
                                                                 "id" => task2.project_id.to_s,
                                                                 "type" => "project"
                                                               }
                                                             }
                                                         }
                                                     }
                                                 }]
    end
  end

  describe "DELETE" do
    it "removes task" do
      expect { delete :destroy, params: { id: task2.id } }.to change(Task, :count).by(-1)
    end
  end
end
