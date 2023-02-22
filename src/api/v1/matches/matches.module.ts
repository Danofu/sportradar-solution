import { Module } from '@nestjs/common';

import { MatchesController } from 'src/api/v1/matches/matches.controller';
import { MatchesGateway } from 'src/api/v1/matches/matches.gateway';
import { MatchesService } from 'src/api/v1/matches/matches.service';

@Module({
  providers: [MatchesGateway, MatchesService],
  controllers: [MatchesController],
})
export class MatchesModule {}
