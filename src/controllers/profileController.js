const admin = require('firebase-admin');
const express = require('express');
const UserDetails = require('../models/user');

const profileRouter = express.Router();

profileRouter.get('/:id', (req, res) => {
    const id = req.params['id'];
    // console.log(id);
    try {
        admin.database().ref('users').child(id).once('value', (snapshot) => {
            let val = snapshot.val();
            if(val) {

                const user = new UserDetails(val.firstName, val.lastName, val.sex, val.address, val.description);
                res.json(user);
            }
            else res.json({
                error: "No Record Present",
                errorCode: 0
            })
        });
    } catch (error) {
        res.status(500).json({error: error});
    }
});

profileRouter.post('/:id', (req, res) => {
    const id = req.params['id'];
    const userDetails = res.body;
    const user = new UserDetails(userDetails.firstName, userDetails.lastName, userDetails.sex, userDetails.address, userDetails.description);
    try {
        if(id) {
            admin.database().ref('users').child(id).set(user, (_) => {
                res.status(201).json({
                    message: 'User has been created'
                });
            })
        }
    } catch (error) {
        res.status(500).json({error: error});
    }
});



exports.profileRouter = profileRouter;