class TaskSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :title, :status, :completed, :due_date, :project_id, :status

  belongs_to :project
end
