import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm"

@Entity('settings')
export class Setting {
  @PrimaryColumn('uuid')
  id: string

  @Column()
  username: string

  @Column()
  chat: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}