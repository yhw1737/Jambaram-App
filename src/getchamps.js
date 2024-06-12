import { createWebSocketConnection } from "league-connect";

const ws = await createWebSocketConnection({
  authenticationOptions: {
    awaitConnection: true,
  },
});

ws.subscribe("/lol-champ-select/v1/session", (data) => {
  console.log(data.actions);
});