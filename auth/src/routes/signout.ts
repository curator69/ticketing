import express from "express";

const router = express.Router();

router.post("/api/users/signout", (_, res) => {
  res.send("Hi there!");
});

export { router as signoutRouter };
