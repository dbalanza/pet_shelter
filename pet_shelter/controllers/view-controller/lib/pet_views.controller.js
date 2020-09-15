const PetsController = require("../../pets.controller");
const PetModel      = require("../../../models/pets.model");

function PetViewController(req, res) {
  	var pet_view_controller 	= this;
	var page_layout_params 		= __defaultPageLayout();

	/* 
		DOCU: This control the metadata, view, assets and onload information in Dashboard page 
		used _by: ViewUserRoute("/")
	*/ 
	pet_view_controller.dashboard = async () => {
		page_layout_params.PAGE.title = "This is dashboard title";
		page_layout_params.PAGE.meta = "This is dashboard meta";
		page_layout_params.PAGE.view = "dashboard";

		page_layout_params.PAGE.modals = [ { file: "../pets/modals/pet_details.modal.ejs", data: {}}];

		/* Custom javascript for dashboard page */
		page_layout_params.PAGE.assets.javascripts.push({ file: `/assets/javascripts/custom/pet/${page_layout_params.PAGE.view}/${page_layout_params.PAGE.view}_fe.js` });
		page_layout_params.PAGE.assets.javascripts.push({ file: `/assets/javascripts/custom/pet/${page_layout_params.PAGE.view}/${page_layout_params.PAGE.view}_be.js` });

		/* Custom css for dashboard page */
		page_layout_params.PAGE.assets.stylesheets.push({ file: `/assets/css/custom/pet/${page_layout_params.PAGE.view}.css` });

		let pets = await PetModel.getPets();
		page_layout_params.DATA.pets = pets.result;
		res.render("layouts/pet.layout.ejs", page_layout_params);
	};

	/* 
		DOCU: This control the metadata, view, assets and onload information in New/Edit Pet page 
		used _by: ViewUserRoute("/pets/new"), ViewUserRoute("/pets/:pet_id/edit")
	*/ 
	pet_view_controller.manage_pet = async () => {
		page_layout_params.PAGE.title = "This is Edit Pet title";
		page_layout_params.PAGE.meta = "This is Edit pet meta description";
		page_layout_params.PAGE.view = "manage_pet";
		page_layout_params.DATA.pet = { id: null, name: "", type: "", description: "", skills: [], likes: 0 };
		
		/* Custom javascript for dashboard page */
		page_layout_params.PAGE.assets.javascripts.push({ file: `/assets/javascripts/custom/pet/${page_layout_params.PAGE.view}/${page_layout_params.PAGE.view}_fe.js` });
		page_layout_params.PAGE.assets.javascripts.push({ file: `/assets/javascripts/custom/pet/${page_layout_params.PAGE.view}/${page_layout_params.PAGE.view}_be.js` });

		/* Custom css for dashboard page */
		page_layout_params.PAGE.assets.stylesheets.push({ file: `/assets/css/custom/pet/${page_layout_params.PAGE.view}.css`});
		
		/* DOCU: Returns a single objet contains the selected pet */ 
		if(req.params.pet_id != undefined){
			let selected_pet = await PetModel.getPet(req.params.pet_id);

			page_layout_params.DATA.pet = {...selected_pet.result, skills: JSON.parse(selected_pet.result.skills)};
		}

		res.render("layouts/pet.layout.ejs", page_layout_params);
	};

	/* DOCU: Private function to get/set default view assets */
	function __getViewAssets() {
		let stylesheets = [
			{ file: "/assets/css/custom/global.css" },
			{ file: "/assets/css/vendor/bootstrap/bootstrap.min.css" }
		];

		let javascripts = [
			{ file: "/assets/javascripts/vendor/jquery/jquery.min.js" },
			{ file: "/assets/javascripts/vendor/bootstrap/bootstrap.min.js" },
			{ file: "/assets/javascripts/custom/global_fe.js" },
			{ file: "/assets/javascripts/custom/global_be.js" }
		];

		return { stylesheets: stylesheets, javascripts: javascripts };
	}
	
	/* 
		DOCU: Private function to get default page layout parameters
		used_by: all UserViewController page methods / functions
	*/ 
	function __defaultPageLayout() {
		return {
			PAGE: {
				title: "This is the title ",
				meta: "this is meta",
				view: "this is view",
				assets: __getViewAssets()
			},
			DATA: {
				users: [],
				modals: []
			}
		};
	}
}
module.exports = PetViewController;
