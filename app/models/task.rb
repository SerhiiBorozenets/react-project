class Task < ApplicationRecord
  belongs_to :project
  after_initialize :set_defaults, unless: :persisted?
  validates :title, :status, :complexity, presence: true

  enum status: { No: 0, Low: 1, Middle: 2, High: 3 }
  enum complexity: { None: 0, Elementary: 1, Intermediate: 2, Advanced: 3, Master: 4 }

  private
  def set_defaults
    self.status  ||= 0
    self.complexity ||= 0
  end
end
