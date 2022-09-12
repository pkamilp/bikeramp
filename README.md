## Running locally

1) `cp .env.example .env`
2) `yarn install`
3) `docker-compose up -d`
4) `yarn typeorm migration:run`

## Generating migrations
`yarn typeorm migration:generate ./src/migrations/MigrationName`

## Swagger
`http://localhost:3100/api/swagger`
