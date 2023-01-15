class Project < ApplicationRecord
  has_many :tasks, dependent: :destroy
  has_one_attached :image
  belongs_to :user
  validates :slug, uniqueness: true
  validates :title, presence: true, uniqueness: { scope: :user_id }
  validate :slug_not_changed

  before_create :slugify

  def slugify
    itr = 1
    loop do
      title_slug = title.parameterize == 'new' ? "#{title.parameterize}#{itr}" : title.parameterize
      slug_candidate = itr > 1 ? "#{title_slug}-#{itr}" : title_slug
      break self.slug = slug_candidate unless Project.exists?(slug: slug_candidate)
      itr += 1
    end
  end

  def slug_not_changed
    if slug_changed? && self.persisted?
      errors.add(:slug, 'is immutable!')
    end
  end

  def tasks_count
    tasks.length
  end

  def progress
    return "0" if tasks_count == 0

    task_completed = tasks.select {|task| task.completed }.count
    tasks_count
    (task_completed * 100) / tasks_count
  end

  def due_date
    tasks.pluck(:due_date).compact.max
  end

  def image_url
    Rails.application.routes.url_helpers.url_for(image) if image.attached?
  end
end