import { MigrationInterface, QueryRunner } from 'typeorm'

export class Init1738278326505 implements MigrationInterface {
  name = 'Init1738278326505'

  public async up(queryRunner: QueryRunner): Promise<void> {
    //forgot to run migrations in the first place
    await queryRunner.query(
      `CREATE TYPE "public"."permission_action_enum" AS ENUM('view', 'create', 'update', 'delete')`
    )
    await queryRunner.query(
      `CREATE TYPE "public"."permission_resource_enum" AS ENUM('user', 'role', 'admin', 'transaction')`
    )
    await queryRunner.query(
      `CREATE TABLE "permission" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying, "action" "public"."permission_action_enum" NOT NULL, "resource" "public"."permission_resource_enum" NOT NULL, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "client" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "apiKey" character varying NOT NULL, "enabledDomains" jsonb NOT NULL DEFAULT '[]', "metadata" json, CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "role" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying, "clientId" integer NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_13384113abebbca5c8734bb857" ON "role" ("name", "clientId") `
    )
    await queryRunner.query(
      `CREATE TYPE "public"."transaction_type_enum" AS ENUM('deposit', 'credit', 'withdraw', 'adminEnforced')`
    )
    await queryRunner.query(
      `CREATE TYPE "public"."transaction_subtype_enum" AS ENUM('reward', 'purchase', 'refund', 'bonus', 'fee')`
    )
    await queryRunner.query(
      `CREATE TYPE "public"."transaction_status_enum" AS ENUM('pending', 'success', 'failed')`
    )
    await queryRunner.query(
      `CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "type" "public"."transaction_type_enum" NOT NULL, "subType" "public"."transaction_subtype_enum" NOT NULL, "amount" double precision NOT NULL, "status" "public"."transaction_status_enum" NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "email" character varying NOT NULL, "passwordHash" character varying NOT NULL, "previousPasswordHashes" jsonb NOT NULL DEFAULT '[]', "roleId" integer NOT NULL, "clientId" integer NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_c28e52f758e7bbc53828db9219" ON "user" ("roleId") `
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_0f6c11be238ad75c8bd2bd0245" ON "user" ("clientId", "email") `
    )
    await queryRunner.query(
      `CREATE TABLE "session" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc5" ON "session" ("userId") `
    )
    await queryRunner.query(
      `CREATE TABLE "role_permissions" ("roleId" integer NOT NULL, "permissionId" integer NOT NULL, CONSTRAINT "PK_d430a02aad006d8a70f3acd7d03" PRIMARY KEY ("roleId", "permissionId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_b4599f8b8f548d35850afa2d12" ON "role_permissions" ("roleId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_06792d0c62ce6b0203c03643cd" ON "role_permissions" ("permissionId") `
    )
    await queryRunner.query(
      `CREATE TABLE "user_roles" ("userId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "PK_88481b0c4ed9ada47e9fdd67475" PRIMARY KEY ("userId", "roleId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_472b25323af01488f1f66a06b6" ON "user_roles" ("userId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_86033897c009fcca8b6505d6be" ON "user_roles" ("roleId") `
    )
    await queryRunner.query(
      `ALTER TABLE "role" ADD CONSTRAINT "FK_95087651fdd8d806ae9e4d07b5a" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD CONSTRAINT "FK_605baeb040ff0fae995404cea37" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_56f28841fe433cf13f8685f9bc1" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_b4599f8b8f548d35850afa2d12c" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_06792d0c62ce6b0203c03643cdd" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "FK_472b25323af01488f1f66a06b67" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "FK_86033897c009fcca8b6505d6be2" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_roles" DROP CONSTRAINT "FK_86033897c009fcca8b6505d6be2"`
    )
    await queryRunner.query(
      `ALTER TABLE "user_roles" DROP CONSTRAINT "FK_472b25323af01488f1f66a06b67"`
    )
    await queryRunner.query(
      `ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_06792d0c62ce6b0203c03643cdd"`
    )
    await queryRunner.query(
      `ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_b4599f8b8f548d35850afa2d12c"`
    )
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`
    )
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_56f28841fe433cf13f8685f9bc1"`
    )
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP CONSTRAINT "FK_605baeb040ff0fae995404cea37"`
    )
    await queryRunner.query(
      `ALTER TABLE "role" DROP CONSTRAINT "FK_95087651fdd8d806ae9e4d07b5a"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_86033897c009fcca8b6505d6be"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_472b25323af01488f1f66a06b6"`
    )
    await queryRunner.query(`DROP TABLE "user_roles"`)
    await queryRunner.query(
      `DROP INDEX "public"."IDX_06792d0c62ce6b0203c03643cd"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b4599f8b8f548d35850afa2d12"`
    )
    await queryRunner.query(`DROP TABLE "role_permissions"`)
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3d2f174ef04fb312fdebd0ddc5"`
    )
    await queryRunner.query(`DROP TABLE "session"`)
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0f6c11be238ad75c8bd2bd0245"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c28e52f758e7bbc53828db9219"`
    )
    await queryRunner.query(`DROP TABLE "user"`)
    await queryRunner.query(`DROP TABLE "transaction"`)
    await queryRunner.query(`DROP TYPE "public"."transaction_status_enum"`)
    await queryRunner.query(`DROP TYPE "public"."transaction_subtype_enum"`)
    await queryRunner.query(`DROP TYPE "public"."transaction_type_enum"`)
    await queryRunner.query(
      `DROP INDEX "public"."IDX_13384113abebbca5c8734bb857"`
    )
    await queryRunner.query(`DROP TABLE "role"`)
    await queryRunner.query(`DROP TABLE "client"`)
    await queryRunner.query(`DROP TABLE "permission"`)
    await queryRunner.query(`DROP TYPE "public"."permission_resource_enum"`)
    await queryRunner.query(`DROP TYPE "public"."permission_action_enum"`)
  }
}
