require 'rails_helper'

RSpec.describe Project, :type => :model do
  let!(:project) { create :project }
  let!(:project2) { create :project, title: project.title }
  let(:user) { project.user }

  context 'Relationships' do
    it { expect(subject).to belong_to(:user) }
    it { expect(subject).to have_many(:tasks).dependent(:destroy) }
  end

  context 'Validation' do
    it "is not valid without a title" do
      project.title = nil
      expect(project).to_not be_valid
    end

    it "is not valid with a empty title" do
      project.title = ''
      expect(project).to_not be_valid
    end

    it "is valid with a description" do
      expect(project).to be_valid
    end

    it "projects with the same title have different slugs" do
      expect(project.slug).to_not eq project2.slug
    end

    it "is slug present" do
      expect(project.slug).to eq project.title.parameterize
    end

    it "is slug not changed" do
      expect(project.update(slug: "project-2")).to be_falsey
      expect(project.errors[:slug].join('')).to eq "is immutable!"
    end

    it 'prevent duplicate project`s titles in one user' do
      expect(project).to validate_uniqueness_of(:title).scoped_to(:user_id)
    end
  end
end
