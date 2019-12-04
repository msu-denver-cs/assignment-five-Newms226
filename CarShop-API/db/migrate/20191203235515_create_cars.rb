class CreateCars < ActiveRecord::Migration[5.2]
  def change
    create_table :makes do |t|
      t.string :name
      t.string :country

      t.timestamps
    end

    create_table :parts do |t|
      t.string :name

      t.timestamps
    end

    create_table :cars do |t|
      t.string :model
      t.references :make, foreign_key: true
      t.integer :vin

      t.timestamps
    end

    create_join_table :cars, :parts do |t|
      t.index [:car_id, :part_id]
      t.index [:part_id, :car_id]
    end
  end
end
