import { Controller, Get, HttpCode, Post } from '@nestjs/common';

import { MatchesGateway } from 'src/api/v1/matches/matches.gateway';
import { MatchesService } from 'src/api/v1/matches/matches.service';

@Controller('api/v1/matches')
export class MatchesController {
  constructor(private readonly matchGateway: MatchesGateway, private readonly matchService: MatchesService) {}

  @Get()
  getResults() {
    return this.matchService.getResults();
  }

  @HttpCode(200)
  @Post('start')
  startSimulation() {
    return this.matchService.startSimulation(this.matchGateway.server);
  }

  @HttpCode(200)
  @Post('stop')
  stopSimulation() {
    return this.matchService.stopSimulation(this.matchGateway.server);
  }

  @HttpCode(200)
  @Post('restart')
  restartSimulation() {
    return this.matchService.restartSimulation(this.matchGateway.server);
  }
}
