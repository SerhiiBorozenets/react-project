class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.string :title
      t.boolean :completed, default: false, null: false
      t.integer :status, default: 0, null: false
      t.integer :complexity, default: 0, null: false
      t.date :due_date
      t.belongs_to :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
