exports.scribeCheck = (number) => {
    if(number >= 5){
        return "Novice Scribe";
    } else if (number >= 25) { 
        return "Intermediate Scribe";
    } else if (number >= 125){
        return "Adept Scribe";
    } else if (number >= 625){
        return "Master Scribe";
    } else if (number >= 3125){
        return "Grandmaster Scribe";
    } else {
        return "";
    }
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