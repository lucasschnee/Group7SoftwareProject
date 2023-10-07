import datetime
from pymongo import MongoClient 


cluster = "mongodb+srv://mawopileda:MCBW0hhZ8CjvWSmK@cluster0.tz0leqw.mongodb.net/?retryWrites=true&w=majority"
# database = "mongodb://localhost:27017/"
client = MongoClient(cluster)

print(client.list_database_names())
db = client.test

print(db.list_collection_names())

Trainer1 = {"name": "Mary", "Bio": "Hello! My name is Mary Awopileda and I am a senior at Vandebrilt University majoring in Computer Science and Human and Organizational Development. I have been a member of Vandy Lifts for a year and my lifting goals for this semester is to build my glutes. Come work with me!",
"Available Times:": ["Monday 3-5pm" , "Tuesday 9-11am"]}

Trainers = [{"name": "Reese", "Bio": "Hello! My name is Reese Tateo and I am a senior at Vandebrilt University majoring in Computer Science and Human and Organizational Development. I have been a member of Vandy Lifts for a year and my lifting goals for this semester is to build my glutes. Come work with me!",
"Available Times:": ["Monday 3-5pm" , "Tuesday 9-11am"]}

, {"name": "Lucas", "Bio": "Hello! My name is Lucas Schnee and I am a senior at Vandebrilt University majoring in Computer Science and Human and Organizational Development. I have been a member of Vandy Lifts for a year and my lifting goals for this semester is to build my glutes. Come work with me!",
"Available Times:": ["Monday 3-5pm" , "Tuesday 9-11am"]}

, {"name": "Libby", "Bio": "Hello! My name is Libby Oliver and I am a senior at Vandebrilt University majoring in Computer Science and Human and Organizational Development. I have been a member of Vandy Lifts for a year and my lifting goals for this semester is to build my glutes. Come work with me!",
"Available Times:": ["Monday 3-5pm" , "Tuesday 9-11am"]}]

schedule = db.schedule
result = schedule.insert_one (Trainer1)
result = schedule.insert_many (Trainers)





