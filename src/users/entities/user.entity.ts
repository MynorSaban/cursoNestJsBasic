import { Role } from '../../common/enums/rol.enum';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  /* esto es para postgresql  
 @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.USER],
  }) */

  @Column({ type: 'enum', default: Role.USER, enum: Role }) // para asegurarnos que solo existan ciertos tipos entonces tenemos que tipar la columna
  role: string;

  @DeleteDateColumn({ select: false }) // esto sirve para ocultar la columna en la base de datos
  deletedAt: Date;
}
