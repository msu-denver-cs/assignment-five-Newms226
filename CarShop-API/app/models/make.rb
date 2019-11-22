class Make < ApplicationRecord
  has_many :cars

  validates :name, presence: true, uniqueness: true
  validates :country, presence: true

  def Make.query(params={})
    query = Make.where("name like ?", "%#{params[:name]}%")
    Make.sort(query, params)
  end

  def Make.index(params={})
    Make.sort(Make.all, params)
  end

  private
    def Make.sort(query, params={})
      if params[:order] == 'country'
        query.order(:country, :name).page params[:page]
      else # must be by name!
        query.order(:name, :country).page params[:page]
      end
    end
end
