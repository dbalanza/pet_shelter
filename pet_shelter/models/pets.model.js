const DatabaseQueryModel    = require('./database.model.js');
const Mysql                 = require('mysql');
var Pets                 	= {};

Pets.getPets = async () => {
    let databaseQueryModel 	= new DatabaseQueryModel();
    let response_data 	    = {status: false, result: [], err: null};
    
    try{
        let get_all_pets_query 	= Mysql.format(`SELECT pets.id, pets.name, pet_types.name as type FROM pets INNER JOIN pet_types ON pets.pet_type_id = pet_types.id;`);
	    let result              = await databaseQueryModel.executeQuery(get_all_pets_query);

	    if(result.length > 0){
	    	response_data.status 	= true
	    	response_data.result 	= result;
	    }else{
	    	response_data.message 	= "There are no pets.";
	    }
    }catch(err){
    	response_data.err 			= err;
    	response_data.message 		= "Error in getting all the pets.";
	};

	return response_data;
}

Pets.getPet = async (pet_id) => {
    let databaseQueryModel 	= new DatabaseQueryModel();
    let response_data 	    = {status: false, result: [], err: null};
    
    try{
		let get_pet_query 		= Mysql.format(`
			SELECT pets.id, pets.name, pets.skills, pets.description, pet_types.name as type
			FROM pets
			INNER JOIN pet_types ON pets.pet_type_id = pet_types.id WHERE pets.id = ? LIMIT 1;`, [pet_id]
		);

	    let [get_pet_result] = await databaseQueryModel.executeQuery(get_pet_query);

	    if(get_pet_result){
	    	response_data.status 	= true;
	    	response_data.result 	= get_pet_result;
	    }else{
	    	response_data.message 	= "No pet found";
	    }
    }catch(err){
    	response_data.err 			= err;
    	response_data.message 		= "Error in getting a pet.";
	};

	return response_data;
}

Pets.addPet = async (params) => {
    let databaseQueryModel 	= new DatabaseQueryModel();
    let response_data 	    = {status: false, result: [], err: null};
    
    try{
		let insert_pet_query  = Mysql.format(`INSERT INTO pets SET ?;`, params);
		let insert_pet_result = await databaseQueryModel.executeQuery(insert_pet_query);

	    if(insert_pet_result){
	    	response_data.status 	= true;
	    }else{
	    	response_data.message 	= "Something went wrong";
	    }
    }catch(err){
    	response_data.err 			= err;
    	response_data.message 		= "Something went wrong";
	};

	return response_data;
}

Pets.updatePet = async (params) => {
    let databaseQueryModel 	= new DatabaseQueryModel();
	let response_data 	    = {status: false, result: [], err: null};
	
    try{
		let update_comment_query = Mysql.format(`UPDATE pets SET ? WHERE id = ?;`, [params.update_data, params.id]);
		let update_comment_result = await databaseQueryModel.executeQuery(update_comment_query);

	    if(update_comment_result){
	    	response_data.status 	= true;
	    }else{
	    	response_data.message 	= "Something went wrong";
	    }
    }catch(err){
    	response_data.err 			= err;
    	response_data.message 		= "Something went wrong";
	};

	return response_data;
}

Pets.adoptPet = async (pet_id) => {
    let databaseQueryModel 	= new DatabaseQueryModel();
    let response_data 	    = {status: false, result: [], err: null};
    
    try{
		let adopt_pet_query  = Mysql.format(`DELETE FROM pets WHERE id = ?;`, [pet_id]);
	    let adopt_pet_result = await databaseQueryModel.executeQuery(adopt_pet_query);

	    if(adopt_pet_result){
	    	response_data.status 	= true;
	    	response_data.result 	= {pet_id};
	    }else{
	    	response_data.message 	= "Something went wrong";
	    }
    }catch(err){
    	response_data.err 			= err;
    	response_data.message 		= "Something went wrong";
	};

	return response_data;
}

module.exports = Pets;