const functions = require('firebase-functions');
const FBAuth = require('./utilities/fbAuth');
const app = require('express')();
const cors = require('cors');

app.use(cors());

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

//get all functions from user
const {
    signup,
    signin,
    signout,
    uploadImage,
    levelUp,
    getAuthenticatedUser
} = require('./handlers/users');
//get all function from skills
const {
  getAllSkills,
  addASkill
} = require('./handlers/skills');

// users routes
app.post('/signup', signup);
app.post('/signin', signin);
app.get('/signout', signout);
app.get('/user', FBAuth, getAuthenticatedUser);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user/level', FBAuth, levelUp);

//skills route
app.get('/skills', FBAuth, getAllSkills);
app.post('/skills', FBAuth, addASkill);
//notes route

exports.api = functions.https.onRequest(app);