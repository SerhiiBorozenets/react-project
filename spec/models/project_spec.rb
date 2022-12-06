require 'rails_helper'

RSpec.describe Project, :type => :model do
  let!(:user) { create :user }

  context 'Relationships' do
    it { expect(subject).to belong_to(:user) }
    it { expect(subject).to have_many(:tasks).dependent(:destroy) }
  end

  context 'Validation' do
    it "is not valid without a title" do
      project = Project.new(title: nil)
      expect(project).to_not be_valid
      expect(project.errors[:title].join('')).to eq "can't be blank"
    end

    it "is valid with a description" do
      project = Project.new(title: Faker::Hobby.activity, user_id: user.id)
      expect(project).to be_valid
    end

    it "is create projects with the same title and others slugs" do
      project_1 = Project.create(title: "The project", user_id: user.id)
      project_2 = Project.create(title: "The project", user_id: user.id)
      expect(project_1.slug).to_not eq project_2.slug
    end

    it "is slug present" do
      project = Project.create(title: Faker::Hobby.activity, user_id: user.id)
      expect(project.slug).to eq project.title.parameterize
    end

    it "is slug not changed" do
      project = Project.create(title: Faker::Hobby.activity, user_id: user.id)
      expect(project.update(slug: "project-2")).to be_falsey
      expect(project.errors[:slug].join('')).to eq "is immutable!"
    end
  end
end
