// first get potential friend's UID
let response = await fetch('/api/user/get-uid-with-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: friendSearchVal})
  })
  
  if (!response.ok) {
    setFriendSearchError("No such user with this email")
    setFriendSearchSucc("")
    return;
} else {
    friendSearchID = await response.json();
    setFriendSearchError("")
    setFriendSearchSucc("Friend request sent")
}