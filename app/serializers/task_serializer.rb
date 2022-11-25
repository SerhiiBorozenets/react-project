class TaskSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :title, :status, :completed, :deadline, :project_id, :status

  belongs_to :project
end
