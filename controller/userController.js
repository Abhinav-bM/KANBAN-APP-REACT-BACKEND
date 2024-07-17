const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signupPost = async (req, res) => {
  try {
    const userDetails = req.body;

    const newUser = {
      name: userDetails.name,
      email: userDetails.email,
      password: userDetails.password,
    };
    const user = new User(newUser);
    user.save();
    const userForToken = await User.findOne({ email: userDetails.email });

    const token = jwt.sign(
      {
        id: userForToken._id,
      },

      process.env.JWT_KEY,
      {
        expiresIn: "24h",
      }
    );

    res.cookie("jwt", token, { httpOnly: true, secure : true, maxAge: 86400000 });

    res.status(200).send({ message: "user registered sucessfully" });
  } catch (error) {
    console.error("an error occured : ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const loginPost = async (req, res) => {
  try {
    const userDetails = req.body;
    const user = await User.findOne({ email: userDetails.email });
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    const validPassword = user.password === userDetails.password;

    if (validPassword) {
      const token = jwt.sign(
        {
          id: user?._id,
          email: user?.email,
          name: user?.name,
        },

        process.env.JWT_KEY,
        {
          expiresIn: "24h",
        }
      );

      // res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 }); // 24 hour expiry

      console.log("User logged in successfully using email and password !");
      res.status(200).send({ token });
    }

    if (!validPassword) {
      res.status(401).json({ error: "Invalid password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne({ _id: userId });
    user.tasks.push(req.body.task);
    user.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal sever error" });
  }
};

const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne({ _id: userId });
    res.status(200).json({ data: user.tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const editTaskStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskId = req.body.taskId;
    const user = await User.findOne({ _id: userId });
    user?.tasks.map((task) => {
      if (task.id === taskId) {
        task.status = req.body.taskStatus;
      }
    });
    user.save();
    res.status(200).json({ message: "task status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const editTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne({ _id: userId });
    user.tasks.map((task) => {
      if (task.id === req.body.id) {
        task.content = req.body.content;
      }
    });

    user.save();
    res.status(200).json({ message: "Task edited successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interal server error" });
  }
};

const removeTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne({ _id: userId });
    const index = user.tasks.findIndex((task) => task.id === req.body.id);
    console.log("index : ", index);
    user.tasks.splice(index, 1);
    user.save();
    res.status(200).json({ message: "Internal server error" });
  } catch (error) {
    console.error(error);
    res.status(500).json({error : 'Inernal server error'})
  }
};

const home = async(req, res) => {
  res.send("hello world")
}

module.exports = {
  signupPost,
  loginPost,
  addTask,
  getTasks,
  editTaskStatus,
  editTask,
  removeTask,
  home,
};
