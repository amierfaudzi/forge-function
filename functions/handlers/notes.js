const { db } = require('../utilities/admin');
const { scribeCheck } = require('../utilities/achievement');
// add a note
exports.addNote = (req,res) => {
    
    const newNote = {
        noteTitle: req.body.noteTitle,
        noteContent: req.body.noteContent,
        userId: req.user.user_id,
        videoId: req.body.videoId,
        playlistId: req.body.playlistId,
        isDeleted: false
    }

    let newNoteDoc = db.collection('notes').doc();

    newNoteDoc.set({
        ...newNote,
        noteId: newNoteDoc.id
    }).then(()=>{
        db.collection('notes').where('userId', "==", req.user.uid).get()
        .then(data=>{
            let noteArray = [];
            data.forEach(doc=>{
                noteArray.push(doc.data())
            })
            scribeCheck(noteArray.length, req.user.uid);
            return res.status(201).json("The Note has been created")
        }).catch(err=>console.log(err))
    }).catch(err=>console.log(err))
}

// get all notes
exports.allNote = (req,res) => {
    db.collection('notes').where('playlistId', '==', req.body.playlistId)
    .get().then(doc => {
        doc.forEach(doc=> {
            console.log(doc.data());
            res.json("You are here")
        })
    }).catch(err=>console.log(err))
}

// get a single note
exports.getNote = (req, res) => {
    db.collection('notes')
    .where('userId', '==', req.user.uid)
    .where('videoId', '==', req.body.videoId)
    .get().then(doc=>{
        console.log(doc);
        res.json("here is your note")
    })
}

// update a note
exports.updateNote = (req,res) => {

    db.doc(`notes/${req.body.noteId}`).update({
        noteContent: req.body.noteContent
    }).then(()=>{
        res.status(200).json("Note has been updated");
    }).catch(err=>console.log(err))
}
// delete a note
exports.deleteNote = (req,res) => {
    db.doc(`notes/${req.body.noteId}`).update({
        isDeleted: true
    })
    .then(()=> {
        return res.status(200).json("Note has been deleted");
    })
    .catch(err=>console.log(err))
}