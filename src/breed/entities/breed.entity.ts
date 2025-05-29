import { Cat } from '../../cats/entities/cat.entity';
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Breed {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @OneToMany(() => Cat, (cat) => cat.breed)
  cats: Cat[];
}
