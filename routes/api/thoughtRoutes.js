const router = require('express').Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;

//  {#540,5}
/* 
    These routes are setup the same way as the routes in the userRoutes.js file.
    - The only thing that is changing is that this is being used on the 'thoughts' that a 
    user wants access to using all of the CRUD methods.
*/