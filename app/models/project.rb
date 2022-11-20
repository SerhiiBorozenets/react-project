class Project < ApplicationRecord
  has_many :tasks, dependent: :destroy
  belongs_to :user

  before_create :slugify

  def slugify
    self.slug = name.parameterize
  end
end
