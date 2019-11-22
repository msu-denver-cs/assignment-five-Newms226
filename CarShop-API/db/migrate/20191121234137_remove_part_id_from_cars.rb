class RemovePartIdFromCars < ActiveRecord::Migration[5.2]
  def change
    remove_column :cars, :part_id, :int
  end
end
