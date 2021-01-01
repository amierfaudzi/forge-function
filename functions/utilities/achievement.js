const { db } = require('../utilities/admin');

// Scribe: Number of Notes - on note create
// Architect: Number of skills - on skill create
// Giver: Number of public skills - on skills update
// Scholar: Number of video completed - on level update
exports.achievementCheck = (number, userId, category) => {

    let titleArray = [];
    let userData = {};
    let title, newTitle = '';

    if(requirementsCheck(number)){
        title = `${requirementsCheck(number)} ${category}`
    }
    
    return db.doc(`/users/${userId}`).get()
    .then(doc=>{
        userData = {...doc.data()}
        console.log("This is the titles", userData.titles);
        return userData.titles || [];
    })
    .then(array => {
        titleArray = array;

        if(!titleArray.includes(title)){
            titleArray.push(title);
            newTitle = title;
            db.doc(`/users/${userId}`).update({
                titles: titleArray
            })
            return newTitle;
        }
    })
    .then(()=>{
        console.log("this is the 2nd title inside then", newTitle)
        return newTitle;
    })
    .catch(err=>console.log(err));
}

// achievement requirements
 const requirementsCheck = (number) => {
    if(number >= 5){
        return "Novice";
    } else if (number >= 25) { 
        return "Intermediate";
    } else if (number >= 125){
        return "Adept";
    } else if (number >= 625){
        return "Master";
    } else if (number >= 3125){
        return "Grandmaster";
    } else {
        return "";
    }
 }
