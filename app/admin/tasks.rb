ActiveAdmin.register Task do
  permit_params do
    permitted = [:title, :completed, :status, :complexity, :due_date, :project_id]
    permitted << :other if params[:action] == 'create' && current_user.admin?
    permitted
  end
end
