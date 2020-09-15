const connection    = require('../config/database.js');

/*
	Docu: DatabaseQueryModel Class
		- req (http request object) - store all the query logs if the request object is passed
		- force_log (true / false) - set to true to force the logging feature (Even for queries run in executeQuery(...))
	used by: almost all models
*/
function DatabaseQueryModel (req = undefined, force_log = false){
	let database_query_model = this;

	/*
		DOCU: Executes the given query
			- query: formatted query to be executed (make sure to use mysql.format(`SELECT * FROM heroes WHERE id = ?`, [hero_id]);)
		returns a promise object
		used by: almost all models
	*/
	database_query_model.executeQuery = (query) => {
		return new Promise((resolve, reject) => {
			connection.query(query, function (err, result) {
				if(err) {
					reject(err);
				}else{
		        	resolve(result);
		        }
		    });
		});
	}

	return database_query_model;
}

module.exports = DatabaseQueryModel;
