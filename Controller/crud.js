const Property = require("../Model/property");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    const propertyData = new Property(req.body);
    const savedUser = await propertyData.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.fetch = async (req, res) => {
  try {
    const propertyData = await Property.find();
    if (propertyData.length == 0) {
      res.send(404).json({ messege: "Data not Found" });
    } else {
      res.status(200).json({
        msg: "Data fetched Successfully",
        Data: propertyData,
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const propertyExist = await Property.findOne({ _id: id });
    if (!propertyExist) {
      return res.status(404).json({ msg: "data not found" });
    }
    const updateProperty = await Property.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(updateProperty);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const propertyExist = await Property.findOne({ _id: id });
    if (!propertyExist) {
      return res.status(404).json({ msg: "data not found" });
    }
    await Property.findByIdAndDelete(id)
    res.status(201).json({msg:"deleted successfully"})
  } catch (error) {
    res.status(500).send(error);
  }
};
