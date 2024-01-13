import { Entity, PrimaryGeneratedColumn, Column , Repository} from 'typeorm';

@Entity()
export class Sample {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   sample: string;
}


