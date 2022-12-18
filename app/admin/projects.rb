ActiveAdmin.register Project do
  permit_params do
    permitted = [:title, :user_id, :slug]
    permitted << :other if params[:action] == 'create' && current_user.admin?
    permitted
  end
end
