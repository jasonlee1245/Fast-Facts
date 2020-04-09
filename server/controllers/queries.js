const { JsonBox } = require('jsonbox-node');

const getEpisodes = async (req, res, next) => {
  const jbn = new JsonBox();
  let episodes = await jbn.read('box_33bc3354a8ca7c6b7d1f', 'episodes');
  res.body = episodes;
  await next();
}

const newEpisode = async (req, res, next) => {
  if(!req.body) next({log: 'req.body not found', message: {err: 'error in newApp'}})
  const jbn = new JsonBox();
  await jbn.create({name: req.body.episodeName, questions: req.body.newAnswers}, 'box_33bc3354a8ca7c6b7d1f', 'episodes')
  await next();
}

const deleteEpisode = (req, res, next) => {

}

module.exports = {
  getEpisodes,
  newEpisode,
  deleteEpisode
}