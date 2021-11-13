const express = require("express");
const Exercise = require("../models/Exercise");
const User = require("../models/User");
const Router = new express.Router();


Router.get("/", async (req, res) => {
    try {
       const exercises = await Exercise.find({});
       res.status(200).send(exercises);
    }
    catch(err) {
        console.error(err);
        res.status(404).send(err);
    }
})

Router.get("/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        const exercise  = await Exercise.findById(_id);
        res.status(200).send(exercise);
    }
    catch(err) {
        console.error(err);
        res.status(404).send(err);
    }
})

Router.delete("/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        await Exercise.findByIdAndDelete(_id);
        res.status(200).send("exercise deleted!");
    }
    catch(err) {
        console.error(err);
        res.status(404).send(err);
    }
})

Router.post("/update/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        const exercise = await Exercise.findById(_id);
        exercise.username = req.body.username;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);
        exercise.description = req.body.description;
        //res.status(200).send(req.body);

        exercise.save().then(() => {
            res.status(200).send("success!");
        }).catch((err) => {
            console.error(err);
            res.status(404).send(err);
        })
    }
    catch(err) {
        console.error(err);
        res.status(404).send(err);
    }
})
Router.post("/add", async (req, res) => {
    try { 
       const { username, description, duration, date } = req.body;
       const newExercise = new Exercise({ 
           username, description, duration, date
       });
       await newExercise.save();
       res.status(200).send("exercise Added!");
       console.log("Exercise Added!");
    }
    catch(err) {
        console.error(err);
        res.status(404).send(err);
    }
})


module.exports = Router;