class Task < ApplicationRecord
  belongs_to :project
  validates :title, presence: true

  enum status: { Low: 0, Middle: 1, High: 2 }
end
