ActiveAdmin.register User do

  index do
    column :id
    column 'Email' do |user|
      link_to(user.email, admin_user_path(user))
    end
    column :full_name
    column :provider
    column :created_at
    actions
  end

  show do
    attributes_table do
      row :email
      row :full_name
      row :provider
      row :created_at
    end
  end

  form do |f|
    f.inputs "User Details" do
      f.input :email
      f.input :password
      f.input :full_name
      f.input :avatar_url
    end
    f.actions
  end

  def create
    @user = User.new(permit_params)
  end

  permit_params :email, :password, :avatar_url, :provider, :full_name
end
