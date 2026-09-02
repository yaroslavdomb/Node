import { type Request, type Response, Router } from "express";
import mysql2 from "mysql2";

const connectionStr = mysql2.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "eshop"
});

const usersRouter = Router();

usersRouter.get("/first", (req: Request, res: Response) => {
  res.json({ user1: "U1" });
});

usersRouter.get("/all", (req: Request, res: Response) => {
  res.json({ usersList: [{ user1: "U1" }, { user2: "U2" }, { user3: "U3" }] });
});

usersRouter.get("/fromDB", (req: Request, res: Response) => {
  connectionStr.query("SELECT * FROM users", (error, result) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.json(result);
    }
  });
  res.json({ usersList: [{ user1: "U1" }, { user2: "U2" }, { user3: "U3" }] });
});

usersRouter.post("/", (req: Request, res: Response) => {
  const { username, email } = req.body;
  const sql = `INSERT INTO users (username, email) VALUES  (${username}, ${email})`;
  connectionStr.query(sql, (error, result) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(201).json(result);
    }
  });
});

export default usersRouter;
