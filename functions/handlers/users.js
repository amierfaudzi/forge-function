const { admin, db } = require('../utilities/admin');
const config = require('../utilities/config');
const { v4: uuidv4 } = require('uuid');

const firebase = require('firebase');
firebase.initializeApp(config);

const {
    validateSignupData,
    validateSigninData
} = require("../utilities/validators");

//sign up a user
exports.signup = (req,res) => {

    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        name: req.body.name,
    }

    const { valid, errors } = validateSignupData(newUser);

    if(!valid)return res.status(400).json(errors);

    const noImg = 'no-img.png';

    let token, userId;
    return firebase.auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(({ user })=> {
        userId = user.uid;
        return user.getIdToken();
    })
    .catch(err=>console.error(err))
    .then(idToken => {
        token = idToken;
        const userInfo = {
            name: newUser.name,
            email: newUser.email,
            imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
            
            userId,
            level: 0
        };

        return db.doc(`users/${userInfo.userId}`).set(userInfo);
    })
    .then(()=>{
        return res.status(201).json({ token });
    })
    .catch(err=>{
        console.error(err);
        if(err.code === "auth/email-already-in-use"){
            return res.status(400).json({ email: "Email is already in use"});
        } else {
            return res.status(500).json({general: "Something went wrong, please try again"});
        }
    });
};

//sign in user
exports.signin = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };

    const { valid, errors } = validateSigninData(user);

    if(!valid) return res.status(400).json(errors);

    firebase.auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(({ user })=> {
        //user destructuring is really important else error
        return user.getIdToken();
    })
    .then(token => {
        return res.json({ token })
    })
    .catch(err => {
        console.error(err);
        return res.status(403).json({ general: "Wrong credentials, please try again"});
    });
}

//signout user
exports.signout = (req, res) => {
    firebase.auth().signOut().then(()=> {
        // Sign-out successful.
        res.status(200).json("User is signed out")
      }).catch(function(error) {
        // An error happened.
      });
} 

//modify to update the level?
// //update user details
// exports.updateUserDetails = (req, res) => {
//     let userDetails = reduceUserDetails(req.body);

//     db.doc(`/users/${req.user.userId}`)
//     .update(userDetails)
//     .then(()=>{
//         return res.json({message: "Details updated successfully"});
//     })
//     .catch(err=> {
//         console.err(err);
//         return res.status(500).json({error: error.code});
//     })
// }

// Upload a profile image for user
exports.uploadImage = (req, res) => {
    const BusBoy = require("busboy");
    const path = require("path");
    const os = require("os");
    const fs = require("fs");
  
    const busboy = new BusBoy({ headers: req.headers });
  
    let imageToBeUploaded = {};
    let imageFileName;
    // String for image token
    let generatedToken = uuidv4();
  
    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      console.log(fieldname, file, filename, encoding, mimetype);
      if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
        return res.status(400).json({ error: "Wrong file type submitted" });
      }
      // my.image.png => ['my', 'image', 'png']
      const imageExtension = filename.split(".")[filename.split(".").length - 1];
      // 32756238461724837.png
      imageFileName = `${Math.round(
        Math.random() * 1000000000000
      ).toString()}.${imageExtension}`;
      const filepath = path.join(os.tmpdir(), imageFileName);
      imageToBeUploaded = { filepath, mimetype };
      file.pipe(fs.createWriteStream(filepath));
    });
    busboy.on("finish", () => {
      admin
        .storage()
        .bucket(config.storageBucket)
        .upload(imageToBeUploaded.filepath, {
          resumable: false,
          metadata: {
            metadata: {
              contentType: imageToBeUploaded.mimetype,
              //Generate token to be appended to imageUrl
              firebaseStorageDownloadTokens: generatedToken,
            },
          },
        })
        .then(() => {
          // Append token to url
          const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`;
          return db.doc(`/users/${req.user.userId}`).update({ imageUrl });
        })
        .then(() => {
          return res.json({ message: "image uploaded successfully" });
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json({ error: "something went wrong" });
        });
    });
    busboy.end(req.rawBody);
  };

  //not tested yet
  exports.levelUp = (req, res) => {

    db.doc(`/users/${req.user.userId}`).update({ level: admin.firestore.FieldValue.increment(1) })
    .then(()=>{
      res.status(200).json("Level up!")
    })
    .catch(err=>console.error(err))
    

  }