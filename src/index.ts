import bodyParser from "body-parser";
import express, { Response } from "express";
import pg from "pg";

// Connect to the database using the DATABASE_URL environment
//   variable injected by Railway
const pool = new pg.Pool();

const app = express();
const port = process.env.PORT || 3333;

app.use(bodyParser.json());
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
app.use(bodyParser.text({ type: "text/html" }));

app.get("/", async (req, res: Response) => {
  const { rows } = await pool.query("SELECT * from users");
  res.json({ data: rows });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
