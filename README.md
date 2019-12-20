# Car Shop

A responsive, mobile-first car view as a single page application (SPA).

Built with docker-compose as 2 custom images with the library Postgres image.

    ror: ruby 2.5.3 with rails 5.2.3 configured in --api mode
    ng: Angular CLI 8.3.2, Angular 8.2.14, Node 12.2

See docker-compose.yml for docker configuration

## Run
1. Install docker
2. Clone this repository
3. `docker-compose up --build`
4. `docker-compose run ror rake db:create`
5. `docker-compose run ror rails db:migrate`
6. `docker-compose run ror rails db:seed`
    - Note this command takes a while
7. Navigate [here](http://localhost:4200) (localhost:4200) after each image has had time to build & load
   - view json api responses at http://localhost:3000

## Cool features
- Responsive web design powered by [Bootstrap 4](https://getbootstrap.com/docs/4.4/getting-started/introduction/)
- Observable based search service with [RxJS](https://rxjs-dev.firebaseapp.com/) that dynamically renders items as user enters input.
  - Intersection Observer based infinite scroll
- Paginated api calls based on [kaminari](https://github.com/kaminari/kaminari)
- Masonry layout with [ngx-masonary](https://www.npmjs.com/package/ngx-masonry)
- Typeahead and modal services in pure Angular with [Angular Powered Bootstrap](https://ng-bootstrap.github.io/#/home)
- Login authentication with [devise-token](https://github.com/lynndylanhurley/devise_token_auth) and [angular-token](https://github.com/neroniaky/angular-token)
  
## In the works
- RESTful json api based on ruby on rails
  - Currently focuses on read operations only, create, update, destroy operations in the works.
  - api is currently (mostly) setup for a restful json api, front-end dev upcoming

## API access
    GET api/cars # index
    GET api/cars?page=1&perpage=12 # current default
    GET api/cars?order=vin&make=Audi&part=A/C # search & order
    GET api/cars/<id> # specific item

- A json api is accessible at localhost:3000/api/\<resource>
    * cars, makes, parts
    * `:format` is ignored in rails, back-end always replies with json
        
## Inspirations
- [ng-bootstrap paginated table](https://ng-bootstrap.github.io/#/components/table/examples#complete)
- [Dockerizing an Angular App](https://mherman.org/blog/dockerizing-an-angular-app/)
- [Quickstart: Compose and Rails](https://docs.docker.com/compose/rails/)