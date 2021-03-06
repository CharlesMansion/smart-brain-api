const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select('*').from('users').where({id})
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error getting user'))
}

const handleProfileUpdate = (req, res, db) => {
  const {id} = req.params;
  const {name, age, pet, avatarurl} = req.body.formInput;
  db('users')
  .where({id})
  .update({name, age, pet, avatarurl})
  .then(resp => {
    res ? res.json("success bro!") : res.status(400).json("unable to update")
  })
  .catch(err => res.status(400).json('error updating user'))
}

module.exports = {
  handleProfileGet, handleProfileUpdate
}