import express from "express";
const router = express.Router();
import { getUsers, createUser, updateUser, deleteUser } from "../controller/user_Controller.js";

router.get("/users", getUsers);
router.post("/users", createUser);
router.put("/users/:userId", updateUser);
router.delete("/users/:userId",deleteUser);

export default router;
