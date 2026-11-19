import { Router } from "express";
import { searchUniqueUsersRoute, searchUsersRoute, createUserRoute, deleteUserRoute, updateUserRoute } from "../../controllers/users/usersController.js";
import { usersAuth } from "../../middlewares/usersAuth.js";
export const privateRouters = Router();

// Users routes
privateRouters.get("/users/search/:id", usersAuth, searchUniqueUsersRoute);
privateRouters.get("/users/search", usersAuth, searchUsersRoute);
privateRouters.post("/users/create", usersAuth, createUserRoute);
privateRouters.patch("/users/update/:id", usersAuth, updateUserRoute);
privateRouters.delete("/users/delete/:id", usersAuth, deleteUserRoute);
