import { UserEntity } from '../../database/entities/user.entity';

export type IUser = Omit<UserEntity, 'password'>;
