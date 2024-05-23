const User = require("../model/userModel")

const signupPost = async (req, res) => {
  try {
    const userDetails = req.body

    

    const newUser  = {
      name : userDetails.name,
      email : userDetails.email,
      password : userDetails.password
    }
    const user = new User(newUser)
    user.save()
    res.status(200).send({message : "user registered sucessfully"})
  } catch (error) {
    console.error("an error occured : ", error);
  }
};

module.exports = { signupPost };
