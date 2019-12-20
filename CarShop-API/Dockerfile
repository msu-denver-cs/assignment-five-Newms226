FROM ruby:2.5.3
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
RUN mkdir /CarShop-API
WORKDIR /CarShop-API

ENV GEM_HOME="/usr/local/bundle"
ENV PATH $GEM_HOME/bin:$GEM_HOME/gems/bin:$PATH
COPY Gemfile /CarShop-API/Gemfile
COPY Gemfile.lock /CarShop-API/Gemfile.lock
RUN gem install bundler
RUN bundle install

COPY . /CarShop-API
# RUN bundle exec rake rails:update:bin

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]

