import { v4 as uuidV4 } from 'uuid';

export type MatchResult = { id: string; result: [{ team: string; score: number }, { team: string; score: number }] };

export default class Match {
  private readonly matchId: string;
  private score1 = 0;
  private score2 = 0;

  constructor(private readonly team1: string, private readonly team2: string) {
    this.matchId = uuidV4();
  }

  updateScore = () => {
    this.flipCoin() ? this.score1++ : this.score2++;
  };

  getResult = (): MatchResult => ({
    id: this.matchId,
    result: [
      { team: this.team1, score: this.score1 },
      { team: this.team2, score: this.score2 },
    ],
  });

  reset = () => {
    this.score1 = 0;
    this.score2 = 0;
  };

  private flipCoin = () => Math.random() < 0.5;
}
