import { MigrationInterface, QueryRunner } from 'typeorm'

export class AlterClient1738523438551 implements MigrationInterface {
  name = 'AlterClient1738523438551'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE "client" SET metadata = '{}' WHERE metadata IS NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "client" ALTER COLUMN "metadata" SET DEFAULT '{}'`
    )
    await queryRunner.query(
      `ALTER TABLE "client" ALTER COLUMN "metadata" SET NOT NULL`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "client" ALTER COLUMN "metadata" DROP DEFAULT`
    )
    await queryRunner.query(
      `ALTER TABLE "client" ALTER COLUMN "metadata" DROP NOT NULL`
    )
  }
}
