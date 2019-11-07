class CreateFeedbackTable < ActiveRecord::Migration[5.2]
  def change
    create_table :feedbacks do |t|
      t.string :name, null: false
      t.text :comments, null: false
    end
  end
end
