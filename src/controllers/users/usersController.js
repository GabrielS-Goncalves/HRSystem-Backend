import { usersTable } from "../../models/users/usersSchema.js";

// Route for catch all users
export const catchUsersRoute = async (req, res) => {
  try {
    const users = await usersTable.find();
    res.json(users);
  } catch (error) {
    console.error(error);
  }
};

// Route for create new users
export const createUserRoute = async (req, res) => {
  const { name, surename, email, password } = req.body;

  try {
    if (!name || !surename || !email || !password) {
      res.json({ message: "All informations is requird!" }).status(400);
      return;
    }

    const newUserInformations = await usersTable.create({
      name: name,
      surename: surename,
      email: email,
      password: password,
    });

    res
      .json({ message: "User creation was successful!" }, newUserInformations)
      .status(201);
  } catch (error) {
    console.error("User creation was unsuccessful!", error);
    res.status(400);
  }
};

// Route for update users
export const updateUserRoute = async (req, res) => {
  const id = req.params.id
  const { name, surename, email, password } = req.body

  try {
    if (!id) {
      res.json({ message: "User ID is required!"}).status(400)
    }

    const userInformations = await usersTable.updateOne({
      _id: id,
      name: name,
      surename: surename,
      email: email,
      password: password
    })

  } catch (error) {
    
  }
}

// Route for delete users
export const deleteUserRoute = async (req, res) => {
  const id = req.params.id;

  try {
    if (!id) {
      res.json({ message: "User ID is required!" }).status(400);
    }

    const userID = await usersTable.deleteOne({
      _id: id,
    });

    res.json({ message: "User deletation was successful!" }, userID).status(200);
  } catch (error) {
    console.error("User deletation was unsuccessful!", error);
    res.status(400);
  }
};
