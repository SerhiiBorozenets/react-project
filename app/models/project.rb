class Project < ApplicationRecord
  has_many :tasks, -> { order(status: :desc) }, dependent: :destroy
  belongs_to :user

  validates :name, presence: true

  before_create :slugify

  def slugify
    slug = name.parameterize
  end

  def tasks_count
    tasks.length
  end

  def deadline
    tasks.order(deadline: :desc).first.deadline
  end
end