const express =require("express");
const router = express.Router();
const propertyData = require("../Model/property");


// all controllers
const locationController = require("../Controller/location");
const categoryController = require("../Controller/category");
const propertyController = require("../Controller/property");
const userController = require("../Controller/user");
const crudController = require("../Controller/crud");





// routers
router.get("/location",locationController.getAllLocations);
router.get("/category",categoryController.getAllCategory);

//Property routes
router.get("/property",propertyController.getAllProperties);
router.get("/byId/:locationId",propertyController.getPropertyByLocationId);
router.get("/propertyById/:id",propertyController.getPropertyById);
router.post("/filter",propertyController.getByAllFilters);
router.get("/PropertId/:id",(req,res)=>{
    console.log(req.params.id);
    propertyData.findById(req.params.id)
    .then(responce =>{
        console.log(responce)
        res.status(200).json({property:responce})
    })
    .catch(err=>console.log(err))
});


//CRUD Operations
router.get("/fetch",crudController.fetch);
router.post("/create",crudController.create);
router.put("/update/:id",crudController.update);
router.delete("/delete/:id",crudController.delete)





//Login Signup
router.post("/login",userController.login);
router.post("/signup",userController.signup);


module.exports = router;
