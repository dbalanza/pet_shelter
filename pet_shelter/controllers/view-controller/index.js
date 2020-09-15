const PetViewController = require('./lib/pet_views.controller');

module.exports = (req, res) =>{
	return{
		instance: new PetViewController(req , res),
	}
}