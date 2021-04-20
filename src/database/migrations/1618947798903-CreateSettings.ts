import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSettings1618947798903 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'settings',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'username',
            type: 'varchar',
            length: '100'
          },
          {
            name: 'chat',
            type: 'boolean',
            default: true
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
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('settings');
  }
}
