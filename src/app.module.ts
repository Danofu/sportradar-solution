import { Module } from '@nestjs/common';

import { MatchesModule } from 'src/api/v1/matches/matches.module';

@Module({
  imports: [MatchesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
