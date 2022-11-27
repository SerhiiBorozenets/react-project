class Project < ApplicationRecord
  has_many :tasks, dependent: :destroy
  # belongs_to :user
  validates :slug, uniqueness: true
  validates :title, presence: true
  validate :slug_not_changed

  before_create :slugify

  def slugify
    itr = 1
    loop do
      title_slug = title.parameterize
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
    return "0" if tasks.length == 0

    task_completed = tasks.select {|task| task.completed }.count
    tasks.length
    (task_completed * 100) / tasks.length
  end

  def due_date
    tasks.map(&:due_date).compact.max
  end
end