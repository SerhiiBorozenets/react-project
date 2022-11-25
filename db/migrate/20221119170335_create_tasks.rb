class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.string :title
      t.boolean :completed, default: false
      t.integer :status
      t.date :deadline
      t.belongs_to :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
