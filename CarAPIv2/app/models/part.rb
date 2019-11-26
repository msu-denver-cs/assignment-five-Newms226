class Part < ApplicationRecord
  has_and_belongs_to_many :cars

  validates :name, presence: true

  def self.search_config
    {
        init: -> { Part.all },

        default_order: %w(parts.name), # must contain at least one value
        default_selects: %w(parts.*),
        default_joins: [],
        # no default wheres, too complicated atm

        search_keys: {
            name: {
                query: 'parts.name'
            }
        }
    }
  end

  def self.api_query (params={})
    QueryGenerator.execute(params, search_config)
  end
end
