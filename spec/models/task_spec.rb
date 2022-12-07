require 'rails_helper'

RSpec.describe Task, :type => :model do
  let!(:task) { create :task }
  let(:project) { task.project }
  let(:user) { project.user }

  context 'Relationships' do
    it { expect(subject).to belong_to(:project) }
  end

  context 'Validation' do
    it "is not valid without a title" do
      task.title = nil
      expect(task).to_not be_valid
      expect(task.errors[:title].join('')).to eq "can't be blank"
    end

    it "is valid with a description" do
      expect(task).to be_valid
    end

    it "is set defaults status and complexity" do
      task_new = Task.new(title: Faker::Hobby.activity, project_id: project.id)
      expect(task_new.complexity).to eq "None"
      expect(task_new.status).to eq "No"
    end

    it "is set custom's status and complexity" do
      task.complexity = "Advanced"
      task.status = "Low"
      expect(task.complexity).to eq "Advanced"
      expect(task.status).to eq "Low"
    end
  end
end
