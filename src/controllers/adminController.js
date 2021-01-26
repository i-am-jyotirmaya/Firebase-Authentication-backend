const admin = require('firebase-admin');
const express = require('express');

const adminRouter = express.Router();

adminRouter.get('/users/google', async (req, res) => {
    const usersResult = await admin.auth().getUsers([{providerId: 'google.com'}]);
    const usersList = usersResult.users.map((res) => {
        return {
            email: res.email,
            displayName: res.displayName,
            uid: res.uid
        }
    });

    res.json(usersList);
});

adminRouter.get('/users/email', async (req, res) => {
    const usersResult = await admin.auth().getUsers([{providerId: 'password'}]);
    const usersList = usersResult.users.map((res) => {
        return {
            email: res.email,
            displayName: res.displayName,
            uid: res.uid
        }
    });

    res.json(usersList);
});

adminRouter.get('/users', async (req, res) => {
    console.log('/users');
    try {
        const usersResult = await admin.auth().listUsers();
        console.log(usersResult);
        const usersList = usersResult.users.map((res) => {
            return {
                email: res.email,
                displayName: res.displayName,
                uid: res.uid
            }
        });

        res.json(usersList);
    } catch (error) {
        res.status(500).json({error: error});
    }
});

adminRouter.post('/transform', async (req, res) => {
    const uid = req.body.uid;
    const isAdmin = req.body.isAdmin;
    admin.database().ref('users').child(uid).update({isAdmin: true}, (err) => {
        if(err) res.status(500).json({error: err});
    }).then((_) => {
        res.status(200).json({
            message: 'User is now Admin'
        });
    });
});

exports.adminRouter = adminRouter;