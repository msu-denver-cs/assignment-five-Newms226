class CreateJoinTableCarPart < ActiveRecord::Migration[5.2]
  def change
    create_join_table :cars, :parts do |t|
      # t.index [:car_id, :part_id]
      # t.index [:part_id, :car_id]
    end
  end
end
