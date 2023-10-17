const { json } = require("express");
const firebase = require("firebase/database");


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


const getUser = async (req, res) => {
  const uid = req.params.uid;
  
  console.log("Hello World");
  // fetch from the database
  try {
    const dbRef = firebase.ref(firebase.getDatabase());
    firebase.get(firebase.child(dbRef, `${uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        return res.status(200).json(snapshot.val());
      } else {
        console.log("No data available");
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
  
  console.log("Bye Wporld");
  // fetch from the database
  console.log(`trainers/${trainerName}`);
  try {
    const dbRef = firebase.ref(firebase.getDatabase());
    firebase.get(firebase.child(dbRef, `trainers/${trainerName}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log("hello1234", snapshot.val());
        return res.status(200).json(snapshot.val());
      } else {
        console.log("No data available");
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
  searchForTrainer
};
