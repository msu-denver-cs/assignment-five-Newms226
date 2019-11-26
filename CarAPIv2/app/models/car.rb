require 'query_generator'

class Car < ApplicationRecord
  belongs_to :make
  has_and_belongs_to_many :parts

  validates :vin, presence: true, numericality: true, uniqueness: true
  validates :model, presence: true
  validates :make_id, presence: true
  # validates :part_ids, presence: true


  def Car.search_config
    {
        init: -> { Car.all },

        default_order: %w(makes.name cars.model), # must contain at least one value
        default_selects: %w(cars.* makes.name),
        default_joins: [:make],
        # no default wheres, too complicated atm

        search_keys: {
            # Those that require a join and select
            make: {
                select: 'makes.name',
                query: 'makes.name',
                join: :make,
            },
            part: {
                select: 'parts.name',
                query: 'parts.name',
                join: :parts,
            },

            # and those that do not
            model: {
                query: 'cars.model',
            },

            vin: {
                query: 'cars.vin',
            },
        }
    }
  end

  def Car.api_query (params={})
    QueryGenerator.execute(params, search_config)
  end

  # instance methods

  def make_name
    Make.find_by_id(self.make_id).name
  end

  def parts_names_ids
    self.parts.map(&:name_id)
  end
end
