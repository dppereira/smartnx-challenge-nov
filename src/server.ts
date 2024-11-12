import express from "express";

const app = express();

app.get('/', (req: express.Request, res: express.Response) =>{
  res.json({
    message: "Server ON",
  })
});

app.listen(8888, () => {
  console.log("Back-end port 8888");
});
