class TaskSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :status, :completed, :deadline, :project_id

  belongs_to :project
end
