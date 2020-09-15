const Ejs           = require("ejs");
const Path          = require("path");
const PetModel      = require("../models/pets.model");
const PetController = {};

PetController.fetchPet = async (req, res) => {
    let pet = await PetModel.getPet(req.body.pet_id);

    Ejs.renderFile(Path.join(__dirname, "../views/pets/modals/templates/pet_detail.content.ejs"), { DATA: {pet: pet.result} }, (err, pets_html) => {
        res.json({
            status: err == null,
            result: { html: pets_html },
            err: err
        });
    })
}

PetController.addPet = async (req, res) => {
    let result = await PetModel.addPet({
        pet_type_id	: req.body.type,
        name		: req.body.name,
        description	: req.body.description,
        skills		: JSON.stringify(req.body.skills),
        created_at	: new Date()
    });

    res.json(result);    
}

PetController.updatePet = async (req,res) => {
    let result = await PetModel.updatePet({
        id      : req.body.id,
        update_data  : {
            pet_type_id	: req.body.type,
            name		: req.body.name,
            description	: req.body.description,
            skills		: JSON.stringify(req.body.skills),
            updated_at	: new Date()
        }
    });

    res.json(result);   
}

PetController.adoptPet = async (req,res) => {
    let result = await PetModel.adoptPet(req.body.pet_id);

    res.json(result);
}

module.exports = PetController;
