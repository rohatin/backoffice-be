# Backoffice backend assignment

## Description

The project was created from the pure scratch, to document the whole thinking process, reasoning for each decision

## Project setup

```bash
npm install
```

## Compile and run the project

```bash
# development
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

Deployments will be managed on custom vps using pm2 and a predefined deploy script that will allow the following:

- install new dependencies (using existing cache)
- build the project
- run new migrations
- run seeds
- update the deployed instance

## Resources
