# SocialNetworkAPI
Social Network API for Challenge 17

# Installation
Pretty straightforward!  No environment variables need to altered, just make sure you have mongoDB installed.
Once everything is downloaded please navigate to the top level of the project, where the outermost package.json file is, and run an "npm i"

# Usage
Once everything is installed, all you need to run is "npm start" and the program should be up and running.
Once the server is running, you can use thunder client (or another similar application) to send fetch requests.

You can try the below requests:
# User Routes/Requests

## Get all users
router.get('/', getAllUsers);
    Get: http://localhost:3001/api/users

## Get a specific user
router.get('/:userId', getUserById);
    Get: http://localhost:3001/api/users/:userId


## Create a user
router.post('/', createUser);
    Post: http://localhost:3001/api/users
    
    {
      "username": "username",
      "email": "email@email.email"
    }

## Update a user

router.put('/:userId', updateUser);
    Put: http://localhost:3001/api/users/:userId

    {
      "username": "username",
      "email": "email@email.email"
    }

## Delete a user

router.delete('/:userId', deleteUser);
    Delete: http://localhost:3001/api/users/:userId


## Add a friend
router.post('/:userId/friends/:friendId', addFriend);
    Post: http://localhost:3001/api/users/:userId/friends/:friendId
    Note: adds friends one directionally


## Delete a friend
router.delete('/:userId/friends/:friendId', removeFriend);
    Delete: http://localhost:3001/api/users/:userId/friends/:friendId



# Thought Routes/Requests

## Get all thoughts
router.get('/', thoughtController.getAllThoughts);
    Get: http://localhost:3001/api/thoughts

## Get a single thought
router.get('/:thoughtId', thoughtController.getThoughtById);
    Get: http://localhost:3001/api/thoughts/:thoughtId

## Post a new thought
router.post('/', thoughtController.createThought);
    Post: http://localhost:3001/api/thoughts

    {
    "thoughtText": "This is a test thought",
    "username": "username"
    }

## Update a thought
router.put('/:thoughtId', thoughtController.updateThought);
    Put: http://localhost:3001/api/thoughts/:thoughtId

    {
    "thoughtText": "This is a test update",
    "username": "username"
    }

## Delete a thought
router.delete('/:thoughtId', thoughtController.deleteThought);
    Delete: http://localhost:3001/api/thoughts/thoughtId


## Post a reaction
router.post('/:thoughtId/reactions', thoughtController.addReaction);
    Post: http://localhost:3001/api/thoughts/:thoughtId/reactions

    {
      "reactionBody": "this is a test reaction",
      "username": "username"
    }

## Delete a reaction
router.delete('/:thoughtId/reactions/:reactionId', thoughtController.removeReaction);
    Delete: http://localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId

# Technology

This program primarily uses Node, Express, and Mongoose/MongoDB