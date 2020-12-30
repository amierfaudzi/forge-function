const { db } = require('../utilities/admin'); 
// getting sub collection data
 
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