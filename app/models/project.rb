class Project < ApplicationRecord
  has_many :tasks, dependent: :destroy
  belongs_to :user

  before_create :slugify

  def slugify
    slug = name.parameterize
  end

  def tasks_count
    tasks.length
  end

  def deadline
    tasks.order(deadline: :desc).first
  end
end