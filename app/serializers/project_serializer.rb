class ProjectSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :user_id, :slug

  has_many :tasks
end
