class TaskSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :status, :completed, :deadline, :project_id, :status

  belongs_to :project
end
