const LocationData = require("../Model/location");

exports.getAllLocations = async (req,res)=>{
    let locationData = await LocationData.find();
    try {
        res.status(200).json({
            messege:"Data Fetch successfully",
            locations:locationData
        })
    } catch (error) {
        res.status(500).send(error)
    }
}