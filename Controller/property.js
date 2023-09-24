const propertyData = require("../Model/property");
const _ = require("underscore");

exports.getAllProperties = async (req,res)=>{
    let PropertyData = await propertyData.find();
    try{
        res.status(200).json({
            messege:"Data Fetch successfully",
            property:PropertyData
        })
    } 
    catch(error){
        console.log(error);
    }
}

exports.getPropertyByLocationId = async (req,res)=>{
    try {
        let PropertyData =await propertyData.find();
        let filterData = _.where(PropertyData,{location_id:parseInt(req.params.locationId)});
        res.status(200).json({
            messege:`Data Fetch successfully in property by ${req.params.locationId}`,
            count:filterData.length,
            property:filterData
        })
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.getPropertyById = async (req,res)=>{
    try {
        const PropertyData = await propertyData.findById(req.params.id); 
        res.status(200).json({
            messege:`Data Fetch successfully in property by ${req.params.id}`,
            property:PropertyData
        })
    } catch (error) {
        res.status(500).send(error)
    }
}



exports.getAllById =async (req, res) => {
    try{
        let PropertyData = await propertyData.find();
        let RestaurantData = await PropertyData.findById(req.params.id);
        let filteredData =RestaurantData;
        
        res.status(200).json({
            message : `Restaurants in ${req.params.id} city fetched successfully`,
            restaurants : filteredData
        });
    }
    catch(err){
        res.status(500).send(err);
    }
};


exports.getByAllFilters =async (req, res) => {
    try {
        
        const {propertType, location, lowCost, highCost, sort, page} = req.body;
        let PropertyData = await propertyData.find();
        let filteredData = PropertyData;
        console.log(req.body);
        
        
        // Filter by meal type
        if (propertType) {
            filteredData = filteredData.filter((property) => property.propertyType_id === parseInt(propertType));
        }
  
        // Filter by location
        if (location) {
            filteredData = filteredData.filter((property) => property.location_id === parseInt(location));
        }
  
        
  
        
        // Filter by cost range
        if (lowCost && highCost) {
            filteredData = filteredData.filter((property) => property.min_price >= parseInt(lowCost) && property.min_price <= parseInt(highCost));
        }
  
        // Sort by rating
        if (sort === 1) {
            filteredData.sort((a, b) => a.min_price - b.min_price);
        }
        if (sort === -1) {
            filteredData.sort((a, b) => b.min_price - a.min_price);
        }
  
        // Pagination
        const pageSize = 2; // Number of properties per page
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const paginatedData = filteredData.slice(startIndex, endIndex);
        // const paginatedData = filteredData;
        const count = filteredData.length;
        const pageCount = Math.ceil(count/pageSize);
        let arr = [];
        for(let i=1; i<= Math.ceil(filteredData.length/pageSize);i++){
            arr.push(i);
        }
        res.status(200).json({
            message: "property fetched successfully with filters",
            count:count,
            pageCount:arr,
            pageSize:2,
            startIndex:startIndex,
            endIndex:endIndex,
            property:paginatedData,
           
        });
    } 
    catch (err) {
        res.status(500).send(err);
    }
};




