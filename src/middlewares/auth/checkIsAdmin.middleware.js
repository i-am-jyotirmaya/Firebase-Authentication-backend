const admin = require('firebase-admin');

exports.checkIsAdmin = async (req, res, next) => {
    if(req.headers['auth']) {
        try {
            const token = req.headers['auth']+'';
            // console.log(token);
            const decodedIDToken = await admin.auth().verifyIdToken(token, true);
            const uid = decodedIDToken.uid;
            if(admin.database().ref(`users/${uid}`).once('value', (snapshot) => {
                const value = snapshot.val();
                if(value) {
                    console.log(value);
                    next();
                } else {
                    res.json({
                        error: "No Record Present",
                        errorCode: 0
                    });
                }
            }));
        } catch(ex) {
            return res.status(403).send();
        }
    }
    else {
        return res.status(401).send();
    }
    
}