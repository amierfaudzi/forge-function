const { db } = require('../utilities/admin');

exports.scribeCheck = (number, userId) => {

    let titleArray = [];
    let userData = {};
    let title = '';

    if(requirement(number)){
        title = `${requirementsCheck(number)} Scribe`
    }

    db.doc(`/users/${userId}`).get()
    .then(doc=>{
        userData = {...doc.data()}
        return userData.titles || [];
    })
    .then(array=>{
        titleArray = array;

        if(title){
            if(!titleArray.includes(title)){
                titleArray.push(title);
            }
        }
    })
    .then(()=>{
        db.doc(`/users/${userId}`).update({
            title: titleArray
        })
        .then(()=>{
            console.log("Data base has been updated");
        }).catch(err=>console.log(err))
    })
    .catch(err=>console.log(err))
}

exports.architectCheck = (number) => {
    if(number >= 5){
        return "Novice Architect";
    } else if (number >= 25) { 
        return "Intermediate Architect";
    } else if (number >= 125){
        return "Adept Architect";
    } else if (number >= 625){
        return "Master Architect";
    } else if (number >= 3125){
        return "Grandmaster Architect";
    } else {
        return "";
    }
}

exports.giverCheck = (number) => {
    if(number >= 5){
        return "Novice Giver";
    } else if (number >= 25) { 
        return "Intermediate Giver";
    } else if (number >= 125){
        return "Adept Giver";
    } else if (number >= 625){
        return "Master Giver";
    } else if (number >= 3125){
        return "Grandmaster Giver";
    } else {
        return "";
    }
}

exports.scholarCheck = (number) => {
    if(number >= 5){
        return "Novice Scholar";
    } else if (number >= 25) { 
        return "Intermediate Scholar";
    } else if (number >= 125){
        return "Adept Scholar";
    } else if (number >= 625){
        return "Master Scholar";
    } else if (number >= 3125){
        return "Grandmaster Scholar";
    } else {
        return "";
    }
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
