import { Router } from "express";
import { testSearchUsersRoute } from "../../controllers/tests/testsController.js";
export const testsRouters = Router();

testsRouters.post("/users", testSearchUsersRoute);