import { MigrationInterface, QueryRunner } from 'typeorm';

export class initial1622954621178 implements MigrationInterface {
    name = 'initial1622954621178'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE "to_do" ("id" SERIAL NOT NULL, "title" character varying(64) NOT NULL, "description" character varying, "completed" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_19d14b861427e18d619639c8f2b" PRIMARY KEY ("id"))');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP TABLE "to_do"');
    }
}
