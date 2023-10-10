const firebase = require("firebase/database");

// Pushes a new friend request notification to the receiver
const sendFriendRequest = async (req, res) => {
  const {senderID, receiverID} = req.body
  const db = firebase.getDatabase();

  console.log("sender:" + senderID)
  console.log("receiver:" + receiverID)

  // we must make sure sender is not already friends of receiver
  let alreadyFriends = false
  
  // call GET using path to sender's friends list
  const path = firebase.ref(db, 'users/' + receiverID + "/friends/" + senderID)
  await firebase.get(path).then((snapshot) => {
    alreadyFriends = snapshot.val();
    return alreadyFriends
  })

  // if already friends, return with error
  if (alreadyFriends)
  {
    res.status(400).json({error: 'Sender is already friends with receiver'})
    return
  }

  // push notification to receiver
  try {
    const path = firebase.ref(db, 'users/' + receiverID + "/notifications/")
    await firebase.push(path, {
      type: "friend request",
      status: "pending",
      senderID: senderID,
    })
    res.status(200).json("Successfully sent friend request")
  } catch (error) {
    res.status(400).json({error: 'Couldn\'t push friend request: ' + error.message})
  }
}


// Changes friend request notification from "pending" to "done"
// Also adds notification sender to receiver's friends list, if answer is true
const answerFriendRequest = async (req, res) => {
  const {userID, notificationID, answer} = req.body
  const db = firebase.getDatabase();

  let notification = null

  // get notification details
  let path = firebase.ref(db, 'users/' + userID + "/notifications/" + notificationID)
  await firebase.get(path).then((snapshot) => {
    notification = snapshot.val()
    return notification
  })

  // make sure notification is friend request and not already done
  if (notification.type != "friend request" || notification.status == "done")
  {
    res.status(400).json({ error: "incorrect notification type or notification already done" })
    return
  }

  // change notification from pending to done
  path = firebase.ref(db, 'users/' + userID + "/notifications/" + notificationID + "/status/")
  await firebase.set(path, 'done');
  
  // if request was accepted, add sender to receiver's friends list
  if (answer) {
    path = firebase.ref(db, 'users/' + userID + "/friends/")
    await firebase.update(path, {[notification.senderID]:true});
    path = firebase.ref(db, 'users/' + notification.senderID + "/friends/")
    await firebase.update(path, {[userID]:true});
  
  }

  res.status(200).json("Successfully answered friend request")
}


// Pushes a new session invite notification to the receiver
const sendSessionInvite = async (req, res) => {
  const {senderID, receiverID, sessionID} = req.body
  const db = firebase.getDatabase();
  
  // we must make sure receiver is not already inside session's attendees
  let alreadyInSession = false
  
  // call GET using path to session's attendees
  const path = firebase.ref(db, 'sessions/' + sessionID + "/attendees/" + receiverID)
  await firebase.get(path).then((snapshot) => {
    alreadyInSession = snapshot.val();
    return alreadyInSession
  })

  // if already attending session, return with error
  if (alreadyInSession)
  {
    res.status(400).json({error: 'Receiver already attending session'})
    return
  }

  // push notification to receiver
  try {
    const path = firebase.ref(db, 'users/' + receiverID + "/notifications/")
    await firebase.push(path, {
      type: "session invite",
      status: "pending",
      senderID: senderID,
      sessionID: sessionID
    })
    res.status(200).json("Successfully sent session invite")
  } catch (error) {
    res.status(400).json({error: 'Couldn\'t push session invite: ' + error.message})
  }
}


// Changes session invtie notification from "pending" to "done"
// Also adds notification receiver to session's attendees, if answer is true
const answerSessionInvite = async (req, res) => {
  const {userID, notificationID, answer} = req.body
  const db = firebase.getDatabase();

  let notification = null

  // get notification details
  let path = firebase.ref(db, 'users/' + userID + "/notifications/" + notificationID)
  await firebase.get(path).then((snapshot) => {
    notification = snapshot.val()
  })

  // make sure notification is session invite and not already done
  if (notification.type != "session invite" || notification.status == "done")
  {
    res.status(400).json({ error: "incorrect notification type or notification already done" })
    return
  }

  // change notification from pending to done
  path = firebase.ref(db, 'users/' + userID + "/notifications/" + notificationID + "/status/")
  await firebase.set(path, 'done')
  
  // if request was accepted, add user's ID to session's attendees, and user's attending sessions
  if (answer) {
    
    path = firebase.ref(db, 'sessions/' + notification.sessionID + "/attendees/")
    await firebase.update(path, {[userID]:true})

    path = firebase.ref(db, 'users/' + userID + "/attendingSessions/")
    await firebase.update(path, {[notification.sessionID]:true})
  }

  res.status(200).json("Successfully answered session invite")
}


module.exports = {
    sendFriendRequest,
    answerFriendRequest,
    sendSessionInvite,
    answerSessionInvite,
};