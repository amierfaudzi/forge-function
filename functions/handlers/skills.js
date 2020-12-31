const { db } = require('../utilities/admin');

//get all skills
exports.getAllSkills = (req,res) => {
    let skillsData = [];
    db.collection('skills').where('userId', "==", req.user.uid)
    .get().then((data)=>{
        data.forEach(doc=>{
            skillsData.push(doc.data());
        })
        return res.json(skillsData);
    })
    .catch(err=>console.log(err))
};

//add a a skill
exports.addSkill = (req, res) =>{

    if(req.body.skillName.trim() === ""){
        return res.status(400).json({ skillName : "Skill name must not be empty" });
    }

    const newSkill = {
        userId: req.user.user_id,
        skillName: req.body.skillName,
        skillDescription: req.body.skillDescription,
        videoAmount: req.body.totalVideos,
        playlistId: req.body.playlistId,
        title: req.body.title,
        channelTitle: req.body.channelTitle,
        description: req.body.description,
        thumbnailUrl: req.body.thumbnailUrl,
        nextPageToken: req.body.nextPageToken,
        video: req.body.video,
        currentVideo: req.body.currentVideo,
        isPublic: req.body.isPublic,
        isDeleted: false
    }

    console.log(newSkill)

    // //current skills array - mignt need to undo these mfers
    // let currSkill = []
    // db.doc(`/users/${req.user.user_id}`).get()
    // .then((doc)=> {
    //     currSkill = doc.data().skills;
    //     console.log("this is currskill", currSkill, doc.data())
    // })
    // .then(()=>{
    //     //add the new skills
    //     db.collection('skills').add(newSkill)
    //     .then((doc)=>{
    //     let resSkill = newSkill;
    //     resSkill.skillId = doc.id;
    //     currSkill.push(doc.id);
    //     //build a new skills array
    //     db.doc(`/users/${req.user.user_id}`).set({
    //         skills: currSkill
    //     }, {merge: true})
    //     res.status(201).json(resSkill)
    //     })
    // })
    // .catch(err=>console.log(err))

    // db.collection('skills').add(newSkill)
    // .then((doc)=>{
    //     console.log(doc.path)
    //     res.status(201).json(newSkill)
    // })

    let newSkillDoc = db.collection('skills').doc();
    
    newSkillDoc.set({
        ...newSkill,
        skillId: newSkillDoc.id
    }).then(()=>{
        res.json("skill has been created")
    })
}

// delete a skill 
exports.deleteSkill = (req, res) => {
    db.doc(`skills/${req.body.skillId}`).update({
        isDeleted: true
    })
    .then(()=> {
        return res.status(200).json("Skill has been deleted");
    })
    .catch(err=>console.log(err))
}