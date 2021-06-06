import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class ToDo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 64 })
  title!: string;

  @Column({ nullable: true, default: null })
  description!: string | null;

  @Column({ default: false })
  completed!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
