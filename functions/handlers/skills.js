const { db } = require('../utilities/admin');

// Get all skills
exports.getAllSkills = (req,res) => {
    let skillsData = [];
    db.collection('skills').where('userId', "==", req.user.uid)
    .get().then((data)=>{
        data.forEach(doc=>{
            skillsData.push(doc.data());
        })
        return res.status(200).json(skillsData);
    })
    .catch(err=>console.log(err))
};

// Add a a skill
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
        nextPageToken: req.body.nextPageToken || null,
        videos: req.body.video,
        currentVideo: 0,
        isPublic: req.body.isPublic || false,
        isDeleted: false
    }

    let newSkillDoc = db.collection('skills').doc();
    let userData = {};
    let skillsArray = [];

    newSkillDoc.set({
        ...newSkill,
        skillId: newSkillDoc.id
    })
    .then(()=>{
        db.doc(`/users/${req.user.user_id}`).get()
        .then(doc => {
            userData = {...doc.data()}
            return userData.skills || [];
        }).then(array => {

            const miniSkill = {
                skillName: req.body.skillName,
                skillDescription: req.body.skillDescription,
                playlistId: req.body.playlistId,
                thumbnailUrl: req.body.thumbnailUrl,
                skillId: newSkillDoc.id
            }

            skillsArray = array;
            skillsArray.push(miniSkill);
            db.doc(`/users/${userId}`).update({
                skills: skillsArray
            })
        })

    })
    .then((skillsArray)=>{
        res.status(201).json(`${newSkill.skillName} has been added`);
    }).catch(err => console.log(err));
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