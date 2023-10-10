const firebase = require("firebase/database");

const register = async (req, res) => {
  const {email, uid, firstName, lastName, instruments, genres} = req.body

  if (!(firstName && lastName && instruments && genres)) {
    return res.status(400).json({ error: 'Missing fields.'});
  }

  // add to the database
  try {
    const db = firebase.getDatabase();
    await firebase.set(firebase.ref(db, 'users/' + uid), {
      email: email,
      firstName: firstName,
      lastName: lastName,
      instruments: instruments,
      genres: genres,
      friends: [],
      recentSessions: []
    });

    res.status(200);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getUser = async (req, res) => {
  const uid = req.params.uid;

  // fetch from the database
  try {
    const dbRef = firebase.ref(firebase.getDatabase());
    firebase.get(firebase.child(dbRef, `users/${uid}`)).then((snapshot) => {
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

const getUsersName = async (req, res) => {
  const uid = req.params.uid;

  // fetch from the database
  try {
    const dbRef = firebase.ref(firebase.getDatabase());
    firebase.get(firebase.child(dbRef, `users/${uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        
        const userData = snapshot.val()
        const usersFullName = userData.firstName + " " + userData.lastName
        return res.status(200).json({name:usersFullName});
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

const updateInstruments = async (req, res) => {
  const { uid, instruments } = req.body;

  // update the user's instruments
  try {
    const db = firebase.getDatabase();
    await firebase.set(firebase.ref(db, `users/${uid}/instruments`), instruments)
    res.status(200);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const updateGenres = async (req, res) => {
  const { uid, genres } = req.body;

  // update the user's genres
  try {
    const db = firebase.getDatabase();
    await firebase.set(firebase.ref(db, `users/${uid}/genres`), genres)
    res.status(200);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getUIDWithEmail = async (req, res) => {
  const {email} = req.body;
  const db = firebase.getDatabase();

  // get all users
  let path = firebase.ref(db, 'users')
  await firebase.get(path).then((snapshot) => {
    users = snapshot.val()
    userIDs = Object.keys(users)
  
    for (let i = 0; i < userIDs.length; i++)
    {
      const userEmail = users[userIDs[i]].email
      if (userEmail == email)
      {
        return res.status(200).json(userIDs[i])
      }
    }

    return res.status(400).json("couldn't find user with that email")
  })
}

module.exports = {
  register,
  getUser,
  getUsersName,
  updateInstruments,
  updateGenres,
  getUIDWithEmail,
};
