const router = require('express').Router();


router.get('/data', async (req, res, next) => {
  //const data=await prisma.user.fin
  //res.json(data)
 
  res.send({ message: 'Ok api is working 🚀dmmm' });
});

module.exports = router;

