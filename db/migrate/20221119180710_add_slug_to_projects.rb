class AddSlugToProjects < ActiveRecord::Migration[7.0]
  def change
    add_column :projects, :slug, :string
  end
end
