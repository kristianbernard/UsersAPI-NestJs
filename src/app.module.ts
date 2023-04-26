import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AvatarModule } from './avatar/avatar.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:HKkXuG4MNRmFbvCq@cluster0.5c95dc1.mongodb.net/Users?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
    UsersModule,
    AvatarModule,
  ],
})
export class AppModule {}
