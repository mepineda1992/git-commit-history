# GitCommitHistory

## Run App

We have two apps, one for frontend called cloud and one called api. I am using nx to create an integrated monorepo for the apps.
They are built using React and NestJs respectively. Also, to that works you need start a PostgresSQL database (Required for the login option), you can use the docker-compose provided to run one. If you want to change some names or credentials, please update docker.env

## Install dependencies

Do you need install docker and set a .env with your own credentials for GithubApiRest and the DataBase. See an example on .env.template. After that you are ready to run the example. The First steps is run the install

`npm install`

## If you are using  docker-compose docker for the database. Init the database

`docker compose up -d`

## Run api and cloud app

`npm run start:api`

`npm run start:cloud`

# Ports Running

- Api starts an application running on 3000 port. You can reach using http://localhost:3000/graphql (GraphQL Layer)

- Cloud starts an application running on 4200 port. You can reach using http://localhost:4200 (UI)

# Tests

- Run unit test for the api

`npm run test:api`

# Documentation

You can see the used methods for the ui on `http://localhost:3000/graphql`. Check the documentation here

# Development docker

Build docker image base:

`docker build . -t my-base-image:nx-base`

Replace api.env.template to api.env and include your own credentials. Also, replace api.env.template to api.env.
Use .env.prod to build cloud app, and include the api domain. For local development use localhost.

`docker-compose build`

`docker-compose up`

Run the app in `http://localhost` and run the backend `http://localhost/graphql`

## Additional documentation

✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

## Remote caching

Run `npx nx connect-to-nx-cloud` to enable [remote caching](https://nx.app) and make CI faster.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.