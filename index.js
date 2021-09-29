// require your server and launch it
const server = require("./api/server");

server.listen(7000, () => {
  console.log("\n*** Server Running on http://localhost:7000 ***\n");
});
