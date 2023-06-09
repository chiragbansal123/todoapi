const User = require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
module.exports.signUp = async function (req, res) {
    const { user, password } = req.body;
    try {
        const oldUser = await User.findOne({ user });

        if (oldUser) return res.status(400).json({ message: "User already exists" });
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ user, password: hashedPassword });

        const token = jwt.sign({ user: result.user, id: result._id }, 'chirag', { expiresIn: "1h" });

        res.status(201).json({ result, token });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });

        console.log(err);
    }
}
module.exports.signIn = async function (req, res) {
    const { user, password } = req.body;
    try {
      const oldUser = await User.findOne({ user });
      // console.log("oldUser",oldUser);
  
      if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
  
      const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
      console.log(isPasswordCorrect);
      if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ user: oldUser.user, id: oldUser._id }, "chirag", { expiresIn: "1h" });
  
      res.status(200).json({ result: oldUser, token });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Something went wrong" });
    }
}