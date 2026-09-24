import { Router } from "express";

import { login, register } from "../controllers/user.controller.js";

const router = Router();

router.post("/login").post(login);
router.post("/register").post(register);
router.post("/add_to_activity");
router.get("/get_all_activity");

export default router;
