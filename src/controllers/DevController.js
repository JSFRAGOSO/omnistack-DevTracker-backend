const Dev  = require('../models/Dev');
const axios = require('axios');
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index(req,res){
        const users =  await Dev.find()
        return res.json(users);
    },
    
    async store(req,res){
        const {github_username,techs,latitude,longitude}= req.body;

        let dev = await Dev.findOne({github_username});
        if(!dev){
          const response = await axios.get(`https://api.github.com/users/${github_username}`)
          const location = {
            type:'Point',
            coordinates:[longitude,latitude]
          };

          const {name = login, avatar_url, bio} = response.data;
        
          const techsArray = parseStringAsArray(techs)
        
          dev = await Dev.create({
              name,
              github_username,
              avatar_url,
              bio,
              techs:techsArray,
              location
            }
          )
        }
        return res.json(dev);
      }
}