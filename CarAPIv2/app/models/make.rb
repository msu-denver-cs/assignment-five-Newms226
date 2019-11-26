class Make < ApplicationRecord
  has_many :cars

  validates :name, presence: true, uniqueness: true
  validates :country, presence: true

  def self.search_config
    {
        init: -> { Make.all },

        default_order: %w(makes.name makes.country), # must contain at least one value
        default_selects: %w(makes.*),
        default_joins: [],
        # no default wheres, too complicated atm

        search_keys: {
            name: {
                query: 'makes.name'
            },
            country: {
                query: 'makes.country'
            }
        }
    }
  end

  def self.api_query (params={})
    QueryGenerator.execute(params, search_config)
  end
end
