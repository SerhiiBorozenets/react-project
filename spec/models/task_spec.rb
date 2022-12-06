require 'rails_helper'

RSpec.describe Task, :type => :model do
  let!(:user) { create :user }
  let!(:project) { create :project, user_id: user.id }
  let!(:task) { create :task, project_id: project.id }

  context 'Relationships' do
    it { expect(subject).to belong_to(:project) }
  end

  context 'Validation' do
    it "is not valid without a title" do
      task = Task.new(title: nil)
      expect(task).to_not be_valid
      expect(task.errors[:title].join('')).to eq "can't be blank"
    end

    it "is valid with a description" do
      expect(task).to be_valid
    end

    it "is set defaults status and complexity" do
      task = Task.new(title: Faker::Hobby.activity, project_id: project.id)
      expect(task.complexity).to eq "None"
      expect(task.status).to eq "No"
    end

    it "is set custom's status and complexity" do
      task = Task.new(title: Faker::Hobby.activity, project_id: project.id, complexity: "Advanced", status: "Low")
      expect(task.complexity).to eq "Advanced"
      expect(task.status).to eq "Low"
    end
  end
end
