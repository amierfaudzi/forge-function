const { db } = require('../utilities/admin');
const { scribeCheck } = require('../utilities/achievement');
// add a note
exports.addNote = (req,res) => {
    
    const newNote = {
        noteTitle: req.body.noteTitle,
        noteContent: req.body.noteContent,
        userId: req.user.user_id,
        videoId: req.body.videoId,
        playlistId: req.body.playlistId
    }

    db.collection('notes').add(newNote)
    .then((doc)=>{

        db.collection('notes').where('userId', "==", req.user.uid).get()
        .then((data)=> {
            let noteArray = []
            data.forEach(doc=> {
                noteArray.push(doc.data())
            })
            console.log("this is the return",scribeCheck(noteArray.length))
        }).catch(err=>console.log(err))

        return res.json("New note has been created!")
    }).catch(err=>console.log(err))
}

// get all notes
exports.allNote = (req,res) => {
    console.log(req.body.playlistId)
    db.collection('notes').where('playlistId', '==', req.body.playlistId)
    .get().then(doc => {
        doc.forEach(doc=> {
            console.log(doc.data());
            res.json("You are here")
        })
    }
    ).catch(err=>console.log(err))
}