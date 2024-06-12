// let fs = require('fs');
// const { stringify } = require('querystring');
// fs.readdir('../Datas/14.11.1/img/champion', (err, fileList) => {
//     console.log(fileList);
//     for (var i = 0; i < fileList.length; i++){
//         const node = document.createElement("img");
//         node.src = `../Datas/14.11.1/img/champion/${fileList[i]}`;
//         document.getElementById("firstone").appendChild(node);
//     }
// });
import { createWebSocketConnection } from "league-connect";

const ws = await createWebSocketConnection({
  authenticationOptions: {
    awaitConnection: true,
  },
});

ws.subscribe("/lol-champ-select/v1/session", (data) => {
  console.log(data.actions);
});