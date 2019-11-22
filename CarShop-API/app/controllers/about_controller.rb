class AboutController < ApplicationController
  def creator
  end

  def assignments
  end

  def resume
    path = Rails.root.join('app', 'assets', 'resume.pdf')
    send_file(path, type: "application/pdf", disposition: 'inline')
  end
end
