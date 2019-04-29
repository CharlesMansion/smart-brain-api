const jwt = require('jsonwebtoken');
const redis = require('redis');
 
const redisClientReg = redis.createClient(process.env.REDIS_URI);


const handleRegister = (db, bcrypt, req, res) => {
  console.log(16, req.body)
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return Promise.reject('incorrect form submission');
  }
  const hash = bcrypt.hashSync(password);
   return db.transaction(trx => {
      trx.insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date()
          })
          .then(user => user[0]);
      })
      .then(trx.commit)
      .catch(trx.rollback)
    }).then((data) => {
      const user = data 
      return user })
    .catch(err => Promise.reject('unable to register'))
}

const createSessionsRegister = (user) => {
  console.log(7, 'yolo')
  console.log(12, user)
  const {email, id} = user;
  console.log(11, email)
  const token = signTokenReg(email);
  return setTokenReg(token, id)
    .then(() => {
      return {success:'true', userId:id, token}
    })
    .catch(console.log)
} 

const registerAuth = (db, bcrypt) => (req, res) => {
  console.log(15, req.body)
 return handleRegister(db, bcrypt, req, res) 
    .then(data => {
      console.log(8, 'paf')
      return data.id && data.email ? createSessionsRegister(data) : Promise.reject(data)
    })
    .then(session => {
      console.log(13, session)
      return res.json(session)
    })
    .catch(console.log)
}


const signTokenReg = (email) => {
  console.log(9, 'yolo')
  const jwtPayload = {email};
  return jwt.sign(jwtPayload, 'JWT_SECRET')
}

const setTokenReg = (key, value) => {
  console.log(10, 'yolo')
  return Promise.resolve(redisClientReg.set(key,value))
}

module.exports = {
  registerAuth: registerAuth
};


