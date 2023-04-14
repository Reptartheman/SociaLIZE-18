const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  return res.send('Wrong route!');
});

module.exports = router;



//  {#9a7,6}
/*
1. First we import the express Router. 
2. Then we import the routes to be used from the API directory
3. Then sets up the API route.
4. Then error message.
*/