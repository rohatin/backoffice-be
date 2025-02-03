# Backoffice backend assignment

## Description

The project was created from the pure scratch, to document the whole thinking process, reasoning for each decision

### Option 1: Using Docker (Not tested even once)

```bash
# Start PostgreSQL and Redis containers
docker-compose up -d
```

This will start:

- PostgreSQL (accessible at localhost:5432)
- Redis (accessible at localhost:6379)

### Option 2: Manual Installation

#### PostgreSQL

1. Download and install [PostgreSQL](https://www.postgresql.org/download/)
2. Create a database named 'backoffice'
3. Update .env with your database credentials

#### Redis

1. Download and install [Redis](https://redis.io/download)
2. Start Redis server
3. Update .env with your Redis configuration

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

## Bull Dashboard

The project includes a Bull Dashboard for monitoring and managing background jobs/queues. Access it at:

```
http://localhost:3002/queues
```

Default credentials (configurable in .env):

- Username: admin
- Password: admin

Features:

- Real-time queue monitoring
- Job progress tracking
- Failed job management
- Queue metrics and statistics
