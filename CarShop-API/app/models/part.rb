class Part < ApplicationRecord
  has_and_belongs_to_many :cars

  validates :name, presence: true

  def Part.index(params = {})
    Part.all.order(:name).page params[:page]
  end

  def Part.query(params = {})
    Part.where("name like ?", "%#{params[:name]}%").order(:name).page params[page]
  end
end
