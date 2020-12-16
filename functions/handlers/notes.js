//add a note
exports.addANote = (req,res) => {
    
    const newNote = {
        noteTitle: req.body.noteTitle,
        noteContent: req.body.noteContent,
        ytVideoId: req.body.ytVideoId
    }
    //need to get the skills that contains the video
    db.collection('skiil').
    //add the note
    db.collection('notes').add(newNote)
    .then((doc)=>{
        //update skills
        db.doc(`/skills/${req.user.user_id}`).set({
            skills: currSkill
        }, {merge: true})
        res.status(201).json(resSkill)
    })
}