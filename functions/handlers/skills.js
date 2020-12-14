/*
Playlist
A playlist contains multiple video
A playlist can belong to multiple users

PlaylistId
- User ID
- Video ID
- number of videos -  need to get from front end
- overall progress

medium db cant delete cuz cascading difficulty, can hide it instead
needs auth
it will be an object

[x] get playlist
[x] create playlist
delete playlist
edit playlist
*/

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
        skillName: req.body.skillName,
        skillDescription: req.body.skillDescription,
        videoAmount: req.body.videoAmount,
        ytPlaylistId: req.body.ytPlaylistId,
        userId: req.user.user_id,
    }

    //current skills array
    let currSkill = []
    db.doc(`/users/${req.user.user_id}`).get()
    .then((doc)=> {
        currSkill = doc.data().skills;
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
