import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class ToDo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 64 })
  title!: string;

  @Column({ nullable: true, default: null })
  description!: string;

  @Column({ default: false })
  completed!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
