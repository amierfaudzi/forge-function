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
    uploadImage
} = require('./handlers/users');

// users routes
app.post('/signup', signup);
app.post('/signin', signin);
app.get('/signout', signout);
app.post('/user/image', FBAuth, uploadImage);

exports.api = functions.https.onRequest(app);