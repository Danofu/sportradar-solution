import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { MatchesService } from 'src/api/v1/matches/matches.service';

@WebSocketGateway({ namespace: 'v1/matches' })
export class MatchesGateway implements OnGatewayConnection {
  @WebSocketServer() private readonly ioServer: Server;

  constructor(private readonly matchService: MatchesService) {}

  handleConnection(client: Socket) {
    client.emit('results', this.matchService.getResults(), {
      isSimulationRunning: this.matchService.getSimulationStatus(),
    });
  }

  get server() {
    return this.ioServer;
  }
}
