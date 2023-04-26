import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AvatarSchema } from './interfaces/avatar.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Avatar', schema: AvatarSchema }]),
  ],
  controllers: [],
  providers: [],
})
export class AvatarModule {}
