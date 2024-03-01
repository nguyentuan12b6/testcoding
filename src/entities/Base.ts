import { BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn, } from 'typeorm';

export default class Base extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  updatedAt: Date;

  @Column({
    type: 'varchar2',
    nullable: true,
  })
  createdBy: string;

  @Column({
    nullable: true,
    type: 'varchar2',
  })
  updatedBy: string;

  @Column({
    type: 'simple-json',
    default: null,
  })
  metadata: Record<string, any> | Array<any>;
}