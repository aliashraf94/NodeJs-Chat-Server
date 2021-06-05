const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json())

app.use(cors());

const allMessages = [
  {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
},
{
  id: 1,
  from: "Justin Timberlake",
  text: "Can't stop the feeling",
},
{
  id: 2,
  from: "Ali",
  text: "I am coding at MigraCode & i am loving it.",
},
{
  id: 3,
  from: "Yonah",
  text: "Always write the sudo code! Porfavor",
},
]

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [allMessages];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

// Get - Read all the messages

app.get("/messages", function (request, response) {
  response.send(allMessages);
});

// Post - Create a new message
// const lastObject = allMessages[allMessages.length - 1]
// console.log(lastObject)

app.post("/messages", function (request, response) {
  const lastObject = allMessages[allMessages.length - 1]
  const generateId = lastObject.id + 1
  const from = request.body.from
  const text = request.body.text

  const object = {
    id: generateId,
    from: from,
    text: text,
  }

  allMessages.push(object)

  response.status(201).send(object);
});


// Get - Get an Object with Id

app.get("/messages/:id", function (request, response) {
  const id = parseInt(request.params.id)
  const ourObject  = allMessages[id]
  if (ourObject) {
    response.status(200).send(ourObject)
  } else {
    response.status(404).send()
  }
  // response.status(200).send(ourObject)
});

// Del - delete a message by id

app.delete("/messages/:id", (request, response) => {
  const index = parseInt(request.params.id) 
  allMessages.splice(index, 1 , undefined)
  response.status(204).send()
})

app.listen(3000, () => {
   console.log("Listening on port 3000")
  });
