class ProjectSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :user_id, :slug

  has_many :tasks
end
