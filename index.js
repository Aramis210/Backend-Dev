const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const port =process.env.PORT;
// conn.sync({ alter: true }).then(() => {
conn.sync({ force: false }).then(() => {
  console.log('Database connected');
  server.listen(port, () => {
    console.log(`% listening at ${port}`); 
  });
})