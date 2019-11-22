module ApplicationHelper

  # https://gist.github.com/mynameispj/5692162
  def nav_link_class(test_path)
    # binding.pry
    if url_for(request.path).include?(test_path) || (test_path == cars_path && request.path == '/')
      'nav-item active'
    else
      'nav-item'
    end
  end

  def right_nav_class(test_path)
    if url_for(request.path) == url_for(test_path)
      'btn btn-primary'
    else
      'btn btn-outline-primary'
    end
  end

  def cars_path?(test_path)
    test_path == '/' || test_path == cars_path
  end

end
