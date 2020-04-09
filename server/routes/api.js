const express = require('express');
const db = require('../controllers/queries');
const router = express.Router();

router.get('/', db.getEpisodes, function(req,res) {
    res.status(200).json(res.body);
})
  
router.post('/', db.newEpisode, function(req, res) {
  res.sendStatus(200);
})
  
router.delete('/:_id', db.deleteEpisode, function(req, res) {
  res.sendStatus(200);
})

module.exports = router;