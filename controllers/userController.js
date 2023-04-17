const { User, Thought } = require("../models");

const userController = {
  getUsers(req, res) {
    User.find()
      .select("-__v")
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("thoughts")
      .populate("friends")
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "ID does not exist" });
        }
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      {
        _id: req.params.userId,
      },
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((user) => {
        if (!user) {
          return res.status(400).json({ message: "ID not found" });
        }
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        return Thought.deleteMany({ _id: { $in: user.thoughts } });
      })
      .then(() => {
        res.json({ message: "User and associated thoughts deleted!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = userController;


    
    //  {#b88,3}
/*     Line1 3-10: The getUsers() will GET all users.
        - .select() is excluding a version of the document from the data.
        - .then() is returning the data as a JSON object. */

    //  {#913,6}
   /*  Lines 14-27: The getSingleUser() will GET a single user.
        - .select() is excluding a version of the document from the data.
        - .populate() will populate the thoughts field of the return object.
        - .populate() will populate the friends field of the returned object.
        - .then() is saying 'if the user does not exist', return the error message.
            - if they do exist, respond with the user data. */

    //  {#a5f,4}
    /* Lines 31-36: The createUser() will POST a single user.
        - It's using the User schema to create a user based on the data
        in the request body.
        - .then() if the user is created, respond with the data as a JSON object. */
    
    //  {#e26,10}
 /*    Lines 40-62: The updateUser() will make a PUT request to update the user.
      - It's finding the user by the user id...
      - The $set operator updates the data based on the req.body.
      - runValidators: Is checking to see if all rules are valid in the update.
        - By default Mongoose runs validation with a NEW document but not when updating one.
        - These rules are set in the schema.
      - .then() says...
        - If the user doesn't exist, return an error. Otherwise respond
        with the user data as a JSON object.
        - If there's an error, return the error. */

   //  {#bef,7}
   /*  Lines 65-78: deleteUser() will make a DELETE request to delete a user single user.
      - Is finding a User by a specific user id defined in the User schema.
      - If the user does not exist, an error message will be displayed.
      - If the user does exist, all Thoughts associated with that user, will also
      deleted.
      - .then() let's the user know that the User has been deleted.
      - .catch() returns a server side error. */

//  {#36a,9}
/*     Lines 82-96: addFriend() will add a friend to a specific user.
      - It's going through the User schema and searching for the userId. 
      - It will then specify the query criteria as the _id field of the user document, 
      which is passed in as a URL parameter.
      - $addToSet: Specifies the update operation. The steps are...
        - add a friend id to the friends array field in the user document.
        - This is only done if the friend id does not already exist in the array.
        - It also takes the id turns into a URL parameter.
      - new true: returns updated data to the user. */

//  {#4d9,4}
/*     Lines 100-114: removeFriend() will make a DELETE request
      - Finding a user by a specific id.
      - $pull: Is removing a friend based on that friend's ID.
      - the new data will be returned. */

