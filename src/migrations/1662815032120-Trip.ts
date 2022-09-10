import { MigrationInterface, QueryRunner } from 'typeorm';

export class Trip1662815032120 implements MigrationInterface {
  name = 'Trip1662815032120';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "trips" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "start_address" character varying NOT NULL, "destination_address" character varying NOT NULL, "distance" integer NOT NULL, "price" integer NOT NULL, "currency" character varying NOT NULL, "delivery_date" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_f71c231dee9c05a9522f9e840f5" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "trips"`);
  }
}
