import { Router } from "express";
import { catchUsersRoute, createUserRoute, deleteUserRoute, updateUserRoute } from "../../controllers/users/usersController.js";
export const usersRouter = Router();

usersRouter.get("/users/catch", catchUsersRoute);
usersRouter.post("/users/create", createUserRoute);
usersRouter.put("/users/update/:id", updateUserRoute);
usersRouter.delete("/users/delete/:id", deleteUserRoute);