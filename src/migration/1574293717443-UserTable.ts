import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserTable1574293717443 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "user_id",
            type: "varchar(400)",
            isPrimary: true,
            isGenerated: false,
          },
          {
            name: "name",
            type: "varchar(400)",
          },
          {
            name: "username",
            type: "varchar",
          },
          {
            name: "imageURL",
            type: "varchar(400)",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("users");
  }
}
