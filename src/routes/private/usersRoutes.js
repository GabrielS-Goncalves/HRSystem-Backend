import { Router } from "express";
import { searchUniqueUsersRoute, searchUsersRoute, createUserRoute, deleteUserRoute, updateUserRoute } from "../../controllers/users/usersController.js";
export const usersRouter = Router();

usersRouter.get("/users/search/:id", searchUniqueUsersRoute);
usersRouter.get("/users/search", searchUsersRoute);
usersRouter.post("/users/create", createUserRoute);
usersRouter.patch("/users/update/:id", updateUserRoute);
usersRouter.delete("/users/delete/:id", deleteUserRoute);