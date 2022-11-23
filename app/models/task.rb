class Task < ApplicationRecord
  belongs_to :project
  validates :name, presence: true

  enum status: { low: 0, middle: 1, high: 2 }
end
