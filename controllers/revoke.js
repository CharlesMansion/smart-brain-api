const redis = require('redis');
const redisClientRevoke = redis.createClient(process.env.REDIS_URI);


const delToken = (key, value) => {
  console.log(18, 'yolo')
  return Promise.resolve(redisClientRevoke.del(key,value))
}

const revokeAuth = (db) => (req, res) => {
  const {token, id} = req.body;
  console.log(17,token)
  return delToken(token, id)
  .then(() => res.json('token removed!'))
  // return authorization ? getAuthTokenId(req, res) : 
  // handleSignin(db, bcrypt, req, res) 
  //   .then(data => {
  //     return data.id && data.email ? createSessionsSignIn(data) : Promise.reject(data)
  //   })
  //   .then(session => res.json(session))
  //   .catch(err => res.status(400).json(err))
}

module.exports = {
  revokeAuth: revokeAuth,
 
}