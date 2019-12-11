# base image
FROM node:12.2.0

# install chrome for protractor tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable

# set working directory
# RUN mkdir /app
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json .

RUN npm install -g @angular/cli
RUN npm install
# problem with token authn, might require another npm install :/

# add app
COPY . .

# start app
CMD ng serve --host 0.0.0.0
