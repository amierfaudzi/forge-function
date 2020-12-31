const functions = require('firebase-functions');
const FBAuth = require('./utilities/fbAuth');
const app = require('express')();
const cors = require('cors');

app.use(cors());

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

// user functions
const {
    signup,
    signin,
    signout,
    uploadImage,
    levelUp,
    getAuthenticatedUser,
    superUser
} = require('./handlers/users');
// skill functions
const {
  getAllSkills,
  addASkill
} = require('./handlers/skills');
// note functions
const {
  addNote,
  allNote
} = require('./handlers/notes')
// trial function 
const {
  getNestedDoc,
  getOneVideo
} = require('./handlers/trial')

// users routes
app.post('/signup', signup);
app.post('/signin', signin);
app.get('/signout', signout);
app.post('/super', superUser);
app.get('/user', FBAuth, getAuthenticatedUser);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user/level', FBAuth, levelUp);
// -> add a new title

// skills route
app.get('/skills', FBAuth, getAllSkills);
app.post('/skills', FBAuth, addASkill);
// -> update the skill: position, progress, public
// -> delete the skill

// notes route
app.post('/notes', FBAuth, addNote);
app.get('/notes', FBAuth, allNote);
// -> update the note - no nee d maybe
// -> delete the note

// trial route
app.get('/trial', FBAuth, getNestedDoc);
app.get('/one', FBAuth, getOneVideo)

exports.api = functions.https.onRequest(app);