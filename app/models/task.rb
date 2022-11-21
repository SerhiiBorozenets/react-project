class Task < ApplicationRecord
  belongs_to :project

  enum status: { low: 0, middle: 1, high: 2 }
end
