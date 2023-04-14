const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;


//  {#a10,13}
/* 
    This is our parent router.
    - We import express JS router
    - We import the userRoutes file
    - we import the thoughtRoutes file

    Then we...
    - Setup a route for the user by mounting the 
    imported routes at the users path.
    - Setup a route for the thoughts by mouting
    the imported routes at the thoughts path.

*/