import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

import Match from 'src/api/v1/matches/Match';

@Injectable()
export class MatchesService {
  private matches: Match[] = [
    new Match('Argentina', 'Uruguay'),
    new Match('Brazil', 'Mexico'),
    new Match('Germany', 'Poland'),
  ];

  private isSimulationRunning = false;
  private timer: NodeJS.Timeout;
  private totalScore = 0;

  startSimulation = (server: Server) => {
    if (this.isSimulationRunning) {
      return 'Simulation has already started';
    }

    this.timer = setInterval(() => {
      const match = this.matches[Math.floor(Math.random() * this.matches.length)];
      match.updateScore();
      this.totalScore++;
      server.emit('scoreUpdated', match.getResult());
    }, 10 * 1000);

    setTimeout(() => {
      this.cancelSimulation();
      server.emit('simulationFinished', this.getResults());
    }, 100 * 1000);

    this.isSimulationRunning = true;
    server.emit('simulationStarted');
    return 'Simulation has started';
  };

  stopSimulation = (server: Server) => {
    if (!this.isSimulationRunning) {
      return 'Simulation is not running';
    }

    this.cancelSimulation();
    const results = this.getResults();
    server.emit('simulationFinished', results);
    return results;
  };

  restartSimulation = (server: Server) => {
    this.cancelSimulation();
    this.reset();
    return this.startSimulation(server);
  };

  getResults = () => ({ totalScore: this.totalScore, results: this.matches.map((match) => match.getResult()) });

  getSimulationStatus = () => this.isSimulationRunning;

  private cancelSimulation = () => {
    clearInterval(this.timer);
    this.isSimulationRunning = false;
  };

  private reset = () => {
    this.matches.forEach((match) => match.reset());
    this.totalScore = 0;
  };
}
