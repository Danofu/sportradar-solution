## Installation

```bash
$ yarn install
```

## Running the app

- Rename `.env.example` to `.env` and change `PORT` inside the file if needed.


- Run one of the following scripts to run the application:
    ```bash
    # development
    $ yarn run start
    
    # watch mode
    $ yarn run start:dev
    
    # production mode
    $ yarn run start:prod
    ```

## Endpoints

- `GET /api/v1/matches` - returns total score and matches in JSON. Example response:
  ```json5
  {
    "totalScore": 0, // all goals scored in all games
    "results": [
      {
        "id": "ff1f7412-8daa-4746-b1ca-8a58dae69ce8", // match UUIDv4
        "result": [
          {
            "team": "Argentina", // Name of the first team
            "score": 0 // Score of the first team
          },
          {
            "team": "Uruguay", // Name of the second team
            "score": 0 // Score of the second team
          }
        ]
      },
      "..."
    ]
  }
  ```
- `POST /api/v1/matches/start` - starts a simulation. 
  - Returns:
    - **Simulation has started** - returns if simulation is not started yet.
    - **Simulation has already started** - returns otherwise.
- `POST /api/v1/matches/stop` - stops a simulation.
  - Returns:
    - **Simulation is not running** - returns if simulation wasn't running.
    - **JSON object** that similar to `GET /api/vi/matches` response - returns if simulation was stopped.
- `POST /api/v1/matches/restart` - resets data and runs `POST /api/v1/matches/start` handler function.

## WebSocket Server
The WebSocket server is built with **Socket.io** and it shares the same port as the **API** server. The server is provided with a namespace for matches, which follows the pattern `/v1/matches`.

Events that the server emits:
- **"simulationStarted"** - emits when a simulation starts. Has no arguments.
- **"scoreUpdated"** - emits when the team score changes (every 10 seconds) in one of the matches. Sends one argument that looks like:
    ```json5
    {
      "id": "3395d099-f21b-4210-8a45-979a58645e43", // match UUIDv4
      "result": [
        {
          "team": "Brazil", // Name of the first team
          "score": 1 // Score of the first team
        },
        {
          "team": "Mexico", // Name of the second team
          "score": 0 // Score of the second team
        }
      ]
    }
    ```
- **"simulationFinished"** - emits after 90 seconds user started a simulation or user stopped a simulation himself. Sends one argument that looks like `GET /api/v1/matches` JSON object.
- **"results"** - emits when user connects to server. Sends two arguments:
  - first argument looks like JSON object from `GET /api/v1/matches`
  - second argument tells if simulation is running and look like:
  ```json5
  {
    "isSimulationRunning": true
  }
  ```
