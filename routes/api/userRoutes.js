const router = require('express').Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;


//  {#20c,18}
/* 
1. First, import the express JS router.
2. Then we set variables importing functions from the userController.js file.
    2a. Line 11 has the folder to be required..
3. Line 13: Has two things going on..
    3a. The GET request is calling the getUsers() function.
    3b. The POST request is calling the createUser() function.
4. Line 14 is doing the following...
    4a. Referencing the getSingleUser() function then...
    4b. Referencing the updateUser() function then...
    4c. Referencing the deleteUser() function then...
    4d. All while being used under a specific users id.
5. Line 15 is...
    5a. Referencing the addFriend() function
    5b. Referencing the removeFriend() function
    5c. The route is a specific User's friends list then accessing a specific 
    friend.
*/