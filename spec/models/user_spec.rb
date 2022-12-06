require 'rails_helper'

RSpec.describe User, :type => :model do
  let!(:user) { create :user }
  let!(:user_2) { create :user }

  context 'Relationships' do
    it { expect(subject).to have_many(:projects).dependent(:destroy) }
  end

  context 'Validations' do
    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_presence_of(:password) }

    it 'fails from 1 to 5 characters' do
      user.password = Faker::Internet.password(min_length: 1, max_length: 5)
      expect(user.valid?).to be_falsey
    end
    it 'passes more then 6 characters' do
      user.password = Faker::Internet.password(min_length: 6, max_length: 128)
      expect(user.valid?).to be_truthy
    end
    it 'is valid email' do
      user.email = Faker::Internet.email
      expect(user.valid?).to be_truthy
    end
    it 'is not valid email' do
      user.email = "qwerty"
      expect(user.valid?).to be_falsey
    end
  end
end
