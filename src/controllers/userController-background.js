
const appFirebase  = require('firebase/app');

const config = require('../../config');

const admin = require('firebase-admin');

const axios = require('axios').default;

const qs = require('qs');

const { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword, onAuthStateChanged, signOut, createSessionCookie  } = require('firebase/auth');

const firebaseObject = appFirebase.initializeApp(config.firebaseConfig);

const addUser = async function (req, res) {
    try {
        if (req.body != null) {
            const data = req.body;
            let email = data['email'];
            let password = data['password'];
            let name = data['name'];
            let telefon = data['phone'];

            
            admin.auth().createUser({
                email: email,
                emailVerified: false,
                phoneNumber: telefon,
                password: password,
                displayName: name,
                disabled: false,
            })
            .then((userRecord) => {
                res.status(200).send(userRecord);
            })
            .catch((error) => {
                res.status(400).send(error);
            });

        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const loginUser = async function(req,res){
    try {
        if (req.body != null) {
            const data = req.body;
            let email = data['email'];
            let password = data['password'];
            let auth = getAuth(firebaseObject);
            
                await signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    
                    user.getIdToken().then(idToken =>{
                        
                        createsessionCookie(idToken).then(session =>{
                            res.status(200).send(session);   
                        });
                    });
                })
                .catch((error) => {
                    res.status(400).send(error);
                });
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const stateUser = async function(req,res){
    try {
            let auth = getAuth(firebaseObject);
            
			onAuthStateChanged(auth, currentUser => {
				res.status(200).send(currentUser);
			});
            
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const createsessionCookie = function(idToken){
  const expiresIn = 60 * 60 * 1 * 1 * 1000;
  let auth = getAuth(firebaseObject);
  
  admin.auth().createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        const options = { maxAge: expiresIn, httpOnly: true, secure: true };
        res.cookie('session', sessionCookie, options);
        res.end(JSON.stringify({ status: 'success' }));
        return res;
      },
      (error) => {
        res.status(401).send('UNAUTHORIZED REQUEST!');
        return res;
      }
    );
}

const userActive = async function(req,res){
    try {
        if (req.body != null) {
            const data = req.body;
            let dataToken = data['token'];
            if (dataToken != null) {
                let auth = getAuth(firebaseObject);
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                      const uid = user.uid;
                    } else {
                    }
                });    
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const renewToken = async function(){
    let auth = getAuth(firebaseObject);
    const data = {
        grant_type:refresh_token,
        refresh_token:auth.refresh_token
    }

    const apiKey = "AIzaSyCHzUBvF54ELmktS2V5075TxBe12DynN7U";
    const strPeticion = `https://securetoken.googleapis.com/v1/token?key=${apiKey}`;

    const newToken = axios({
        url: strPeticion,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        method: 'get',
        data: qs.stringify(data),

    }).then(function(response){
        return response.data;
    }).catch(function(error){
        return error;
    });

    return JSON.stringify(newToken);

}

const unloginUser = async function(req,res){
    try {
        let auth = getAuth(firebaseObject);
        signOut(auth).then((session) => {
            res.status(200).send(session);
        }).catch((error) => {
            res.status(400).send(error);
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getUserCredentials = token => async function(){
    firebase.auth().signInWithCustomToken(token)
        .then((userCredential) => {
            var user = userCredential.user;
            return user;
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            return error;
            // ...
        });
}

const createToken = uid => async function(){
    admin
        .auth()
        .createCustomToken(uid)
        .then((customToken) => {
            return customToken;
        })
        .catch((error) => {
            return error;
        });
}

const validateUserToAccess = (email,password) => {
    admin.auth()
        .getUserByEmail(email)
        .then((userRecord) => {
            let isCorrect = userRecord.passwordHash()
            console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
        })
        .catch((error) => {
            console.log('Error fetching user data:', error);
        });

}

module.exports = {
    addUser,
    loginUser,
    stateUser,
    unloginUser
}
