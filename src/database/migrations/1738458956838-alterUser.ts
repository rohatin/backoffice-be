import { MigrationInterface, QueryRunner } from 'typeorm'

export class AlterUser1738458956838 implements MigrationInterface {
  name = 'AlterUser1738458956838'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_roles" DROP CONSTRAINT "FK_86033897c009fcca8b6505d6be2"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c28e52f758e7bbc53828db9219"`
    )
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roleId"`)
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "FK_86033897c009fcca8b6505d6be2" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_roles" DROP CONSTRAINT "FK_86033897c009fcca8b6505d6be2"`
    )
    await queryRunner.query(`ALTER TABLE "user" ADD "roleId" integer NOT NULL`)
    await queryRunner.query(
      `CREATE INDEX "IDX_c28e52f758e7bbc53828db9219" ON "user" ("roleId") `
    )
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "FK_86033897c009fcca8b6505d6be2" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
  }
}
