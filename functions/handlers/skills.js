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
exports.addASkill = (req, res) =>{

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
        currentVideo: req.body.currentVideo
    }

    console.log(newSkill)

    //current skills array
    let currSkill = []
    db.doc(`/users/${req.user.user_id}`).get()
    .then((doc)=> {
        currSkill = doc.data().skills;
        console.log(currSkill)
    }).then(()=>{
        //add the new skills
        db.collection('skills').add(newSkill)
        .then((doc)=>{
        let resSkill = newSkill;
        resSkill.skillId = doc.id;
        currSkill.push(doc.id);
        //build a new skills array
        db.doc(`/users/${req.user.user_id}`).set({
            skills: currSkill
        }, {merge: true})
        res.status(201).json(resSkill)
        })
    })
    .catch(err=>console.log(err))
}
