const { default: axios } = require('axios');
const { db } = require('../utilities/admin'); 
 
exports.getNestedDoc = (req, res) => {

    db.doc('/users/PK9tuOqjDwRrsQa0INSIOdpossS2/hobbies/eVywHad3cz2fudezkvAc')
    .get()
    .then(doc=> {
        console.log(doc)
        res.json("This end point has been reached")
    })
}

exports.getOneVideo = (req,res) => {
    db.collection('skills').where('playlistId', "==", "PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3")
    .get().then(doc=> {
        console.log(doc.data())
        res.json("THis is reached")
    }).catch(err=>console.log(err))

}


// Get all the video from a playlist
exports.videoCompiler = (req,res) => {
    // let playlistDetails = {};
    // let nextPageToken = ''
    // let callURL ='';

    // while(true){

    //     // url builder
    //     if(nextPageToken){
    //         // include the next page into the url
    //         callURL = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${req.body.playlistId}&maxResults=50&key=${process.env.YOUTUBE}&pageToken=${nextPageToken}`
    //     } else {
    //         // use the normies url
    //         callURL = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${req.body.playlistId}&maxResults=50&key=${process.env.YOUTUBE}`
    //     }

    //     axios.get(callURL)
    //     .then((res)=>{

    //         playlistDetails = res.data
    //         nextPageToken = res.data.nextPageToken;
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })

    //     if(!nextPageToken){
    //         break;
    //     }

    //     res.json(playlistDetails)
    // }
}