## Running locally

1) `cp .env.example .env`
2) `docker-compose up -d`
3) `yarn typeorm migration:run`

## Generating migrations
`yarn typeorm migration:generate ./src/migrations/MigrationName`
