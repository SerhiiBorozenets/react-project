class Task < ApplicationRecord
  belongs_to :project
  validates :title, presence: true

  enum status: { Low: 0, Middle: 1, High: 2 }
  enum complexity: { None: 0, Elementary: 1, Intermediate: 2, Advanced: 3, Master: 4 }
end
