import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddBlacklistFeature1738457399603 implements MigrationInterface {
  name = 'AddBlacklistFeature1738457399603'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "blacklist" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "reason" character varying, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_04dc42a96bf0914cda31b579702" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD "firstName" character varying NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD "lastName" character varying NOT NULL`
    )
    await queryRunner.query(
      `ALTER TYPE "public"."permission_resource_enum" RENAME TO "permission_resource_enum_old"`
    )
    await queryRunner.query(
      `CREATE TYPE "public"."permission_resource_enum" AS ENUM('user', 'role', 'admin', 'transaction', 'blacklist')`
    )
    await queryRunner.query(
      `ALTER TABLE "permission" ALTER COLUMN "resource" TYPE "public"."permission_resource_enum" USING "resource"::"text"::"public"."permission_resource_enum"`
    )
    await queryRunner.query(`DROP TYPE "public"."permission_resource_enum_old"`)
    await queryRunner.query(
      `ALTER TABLE "blacklist" ADD CONSTRAINT "FK_53c1ab62c3e5875bc3ac474823e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blacklist" DROP CONSTRAINT "FK_53c1ab62c3e5875bc3ac474823e"`
    )
    await queryRunner.query(
      `CREATE TYPE "public"."permission_resource_enum_old" AS ENUM('user', 'role', 'admin', 'transaction')`
    )
    await queryRunner.query(
      `ALTER TABLE "permission" ALTER COLUMN "resource" TYPE "public"."permission_resource_enum_old" USING "resource"::"text"::"public"."permission_resource_enum_old"`
    )
    await queryRunner.query(`DROP TYPE "public"."permission_resource_enum"`)
    await queryRunner.query(
      `ALTER TYPE "public"."permission_resource_enum_old" RENAME TO "permission_resource_enum"`
    )
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`)
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`)
    await queryRunner.query(`DROP TABLE "blacklist"`)
  }
}
