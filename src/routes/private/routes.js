import { Router } from "express";
import { searchUniqueUsersRoute, searchUsersRoute, createUserRoute, deleteUserRoute, updateUserRoute } from "../../controllers/users/usersController.js";
export const privateRouters = Router();

// Users routes
privateRouters.get("/users/search/:id", searchUniqueUsersRoute);
privateRouters.get("/users/search", searchUsersRoute);
privateRouters.post("/users/create", createUserRoute);
privateRouters.patch("/users/update/:id", updateUserRoute);
privateRouters.delete("/users/delete/:id", deleteUserRoute);