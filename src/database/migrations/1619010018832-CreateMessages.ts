import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMessages1619010018832 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'messages',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true
					},
					{
						name: 'admin_id',
						type: 'uuid',
						isNullable: true
					},
					{
						name: 'user_id',
						type: 'uuid'
					},
					{
						name: 'text',
						type: 'varchar'
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'NOW()'
					},
				],
				foreignKeys: [
					{
						name: 'fk_user_id',
						columnNames: ['user_id'],
						referencedTableName: 'users',
						referencedColumnNames: ['id'],
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE'
					}
				]
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('messages');
	}
}
