exports.scribeCheck = (number) => {
    if(number >= 5){
        return "Beginner Scribe";
    } else if (number >= 25) { 
        return "Novice Scribe";
    } else if (number >= 125){
        return "Adept Scribe";
    } else if (number >= 625){
        return "Adept Scribe";
    } else if (number >= 3125){
        return "Adept Scribe";
    } else {
        return "";
    }
}