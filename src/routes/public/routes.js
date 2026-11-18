import { Router } from "express";
import { usersFrontendLogin } from "../../controllers/login/loginController.js";
export const publicRouters = Router();

// Login routes
publicRouters.post("/login", usersFrontendLogin);