class ProjectSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :title, :user_id, :slug, :tasks_count, :due_date

  has_many :tasks
end
