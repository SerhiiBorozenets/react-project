class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: %i[google_oauth2 github azure_activedirectory_v2]

  has_many :projects, dependent: :destroy
  validates :email, presence: true
  validates :password, presence: true
  validates_format_of :email, with: URI::MailTo::EMAIL_REGEXP

  after_create :create_example_project

  def create_example_project
    Users::CreateExampleProject.new.process(id)
  end

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0, 20]
      user.full_name = auth.info.name # assuming the user model has a name
      user.avatar_url = auth.info.image # assuming the user model has an image
    end
  end
end
