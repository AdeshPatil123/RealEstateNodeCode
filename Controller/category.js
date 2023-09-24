const CategoryData = require("../Model/category");

exports.getAllCategory = async (req,res)=>{
    let categoryData = await CategoryData.find();
    try {
        res.status(200).json({
            messege:"Data Fetch successfully",
            category:categoryData
        })
    } catch (error) {
        res.status(500).send(error)
    }
}