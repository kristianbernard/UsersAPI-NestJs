import { IsNotEmpty, IsString } from 'class-validator';

export class CreatedAvatarDto {
  @IsString()
  @IsNotEmpty()
  readonly avatar: string;

  @IsNotEmpty()
  readonly userId: number;

  @IsString()
  @IsNotEmpty()
  readonly base64: string;
}
