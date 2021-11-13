const express = require("express");
const Router = new express.Router();
const User = require("../models/User");
const Exercise = require("../models/Exercise");

Router.get("/", async (req, res) => {
    try {
       /// res.cookie("user_name", "naman");
      // console.log(req.cookies);
     //  res.cookie("users_name", "naman");
       //console.log("hello");
        const users = await User.find({});
        return res.status(200).send(users);
    }
    catch(err) {
        console.error(err);
        res.status(404).send(err);
    }
})
Router.post("/add", async (req, res) => {
    try {
        const username = req.body.username;
        const newUser = new User({username});

        await newUser.save();
       /// console.log(newUser);
       res.status(200).send("success!");
       //console.log("success!");
    }
    catch(err) {
        console.error(err);
        res.status(404).send(err);
    }
})
Router.delete("/delete/:id", async (req, res) => {
    try {
       const user = await User.findById(req.params.id);
       const userExercises = await Exercise.find({username: user.username});
       if(userExercises.length == 0) return res.status(200).send("success!"); 
       userExercises.forEach(async (exercise) => await Exercise.findByIdAndDelete(exercise._id));
       res.status(200).send("success!");
    }
    catch (err) {
       console.error(err);
       res.status(404).send(err);
    }
})
module.exports = Router;