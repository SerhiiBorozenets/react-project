class ProjectSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :user_id, :slug, :tasks_count, :deadline

  has_many :tasks
end
