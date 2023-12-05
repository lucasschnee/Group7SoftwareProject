const { json } = require("express");
const firebase = require("firebase/database");
//import { push } from 'firebase/database';




const test = async (req, res) => {
    const { testdata } = req.body;
  
    // update the user's instruments
    try {
      const db = firebase.getDatabase();
      await firebase.set(firebase.ref(db, `users/`), testdata)
      return res.status(200).json(); // 200 is an error code for success
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
}

const bookSession = async (req, res) => {
  console.log(req.body);
  const { trainerName, timeSlots, arrayOfDays, userID, userEmail } = req.body; 

  // update the user's instruments
  try {
    const db = firebase.getDatabase();

    for (i = 0; i < arrayOfDays.length; i++){
      if(arrayOfDays[i] != ""){

       //console.log(userID)

        await firebase.set(firebase.ref(db, `/trainers/` + trainerName.replace(/\s+/g, '') + `/Times/` + arrayOfDays[i]), userEmail.split('.')[0])
        
        const ID = await firebase.push(firebase.ref(db, `/users/` + userID + `/sessions/`), {day: arrayOfDays[i],trainer: trainerName})
        //console.log("this :", ID)
        //await firebase.set(firebase.ref(db, `/users/` + userID + `/sessions/` ), {day: arrayOfDays[i]})
        
        
        //let path = firebase.ref(db, `/users/`)
        //await firebase.push(path, {ID: userID})


        //const usersRef = firebase.ref(db, '/users/');
        // const newUserRef = firebase.push(usersRef);
        //await firebase.set(newUserRef, userID);
        //await firebase.push(firebase.ref(db,`/users/` + userID),"booked")
      }
    }
    
    return res.status(200).json(); // 200 is an error code for success
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const getUser = async (req, res) => {
  const uid = req.params.uid;
  
  // fetch from the database
  try {
    const dbRef = firebase.ref(firebase.getDatabase());
    firebase.get(firebase.child(dbRef, `${uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        return res.status(200).json(snapshot.val());
      } else {
        console.log("No data available (getUser)");
      }
    }).catch((error) => {
      console.error(error);
    });
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}


const searchForTrainer = async (req, res) => {
  let trainerName = req.params.trainerName;
  trainerName = trainerName.replace(/\s+/g, ''); // sanitizes the response 
  
  console.log(`trainers/${trainerName}`)

  // fetch from the 
  
  try {
    const dbRef = firebase.ref(firebase.getDatabase());
    console.log(`trainers/${trainerName}`)
    firebase.get(firebase.child(dbRef, `trainers/${trainerName}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log("hello1234", snapshot.val());
        return res.status(200).json(snapshot.val());
      } else {
        console.log("No data available (search for trainer)");
      }
    }).catch((error) => {
      console.error(error);
    });
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// const testSearchForUser = async (req, res) => {
//   console.log("hi");
//   // let userID = req.params.userID;

//     // // fetch from the 
    
//     // try {
//     //   const dbRef = firebase.ref(firebase.getDatabase());
//     //   console.log(`users/${userID}`)
//     //   firebase.get(firebase.child(dbRef, `users/${userID}`)).then((snapshot) => {
//     //     if (snapshot.exists()) {
//     //       console.log("hello1234", snapshot.val());
//     //       return res.status(200).json(snapshot.val());
//     //     } else {
//     //       console.log("No data available (search for trainer)");
//     //     }
//     //   }).catch((error) => {
//     //     console.error(error);
//     //   });
//     // } catch (error) {
//     //   res.status(400).json({ error: error.message })
//     // }
//   }

// const searchForUser = async (req, res) => {
//   let userID = req.params.userID;
  

//   // fetch from the 
  
//   try {
//     const dbRef = firebase.ref(firebase.getDatabase());
//     console.log(`users/${userID}`)
//     firebase.get(firebase.child(dbRef, `users/${userID}`)).then((snapshot) => {
//       if (snapshot.exists()) {
//         console.log("hello1234", snapshot.val());
//         return res.status(200).json(snapshot.val());
//       } else {
//         console.log("No data available (search for trainer)");
//       }
//     }).catch((error) => {
//       console.error(error);
//     });
//   } catch (error) {
//     res.status(400).json({ error: error.message })
//   }
// }

const getAllTrainers = async (req, res) => {
 // console.log("hello2")
  try {
    const dbRef = firebase.ref(firebase.getDatabase());
    firebase.get(firebase.child(dbRef, "trainers")).then((snapshot) => {

      if (snapshot.exists()) {
        return res.status(200).json(snapshot.val());
      } else {
        console.log("Snapshot doesn't exist (getAllTrainers)");
      }
    }).catch((error) => {
      console.error(error);
    });
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}



// const searchForTrainer = async (req, res) => {
//   const trainerName = req.params.trainerName;

//   console.log(trainerName)

//   // fetch from the database
//   try {
//     const dbRef = firebase.ref(firebase.getDatabase());
//     firebase.get(firebase.child(dbRef, `trainers/${trainerName}`)).then((snapshot) => {

//       if (snapshot.exists()) {
        
//         const trainerData = snapshot.val()
//         return res.status(200).json(trainerData);
//       } else {
//         console.log("No Trainer Found");
//       }
//     }).catch((error) => {
//       console.error(error);
//     });
//   } catch (error) {
//     res.status(400).json({ error: error.message })
//   }
// }




module.exports = {
  getUser,
  test,
  searchForTrainer,
 //searchForUser,
  //testSearchForUser,
  bookSession,
  getAllTrainers
};
