import { MigrationInterface, QueryRunner } from 'typeorm'

export class AlterTransaction1738542296556 implements MigrationInterface {
  name = 'AlterTransaction1738542296556'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD "description" character varying`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP COLUMN "description"`
    )
  }
}
