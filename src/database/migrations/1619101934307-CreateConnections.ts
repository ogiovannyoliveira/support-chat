import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateConnections1619101934307 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'connections',
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
						type: 'uuid',
					},
					{
						name: 'socket_id',
						type: 'varchar',
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'NOW()'
					},
					{
						name: 'updated_at',
						type: 'timestamp',
						default: 'NOW()'
					}
				],
				foreignKeys: [
					{
						name: 'fk_connection_user_id',
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
		await queryRunner.dropTable('connections');
	}
}
