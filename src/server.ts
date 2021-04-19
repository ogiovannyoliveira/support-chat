import express from "express";

const app = express();

app.listen(process.env.APP_PORT || 3333, () => {
  console.log('Server already to launch on port %s! 🚀', 3333);
})