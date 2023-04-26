import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatedUsersDto {
  readonly id: number;

  readonly first_name: string;

  readonly last_name: string;

  readonly email: string;

  readonly avatar: string;
}
