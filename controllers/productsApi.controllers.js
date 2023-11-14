const Product = require("../models/products.models")

    // Read
    const getProduct = async (req, res) => {
    try {
        const id = req.params.id || "";
        let products = id ? await Product.find({id}, "-_id -__v") : await Product.find({}, "-_id -__v") ; //{}
        res.status(200).json(products);
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({msj:`ERROR: ${error.stack}`});
    }
    }

    // CREATE
    const createProduct = async (req, res) => {
    console.log(req.body);

    try{
        const data = req.body;
        let answer = await new Product(data).save();
        res.status(201).json({message: "Producto creado", product: answer});

    }catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({msj:`ERROR: ${error.stack}`});
    }
    }   

    // Update
    const updateProduct = async (req, res) => {
        try {
            // console.log(req.params.id)
            const id = req.params.id || "";
            const data = req.body;
            id ? await Product.updateOne({_id: id}, data) : Product.updateMany({}, { $set: data });
            res.status(200).json({message: "Producto editado", product: await Product.find({_id: id})})
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(400).json({msj:`ERROR: ${error.stack}`});
        }
        }

     // Delete
     const deleteProduct = async (req, res) => {
        try {
            const title = req.body.title || "";
            title ? await Product.deleteOne({title: title}) : await Product.deleteMany({}) ; //{}
            res.status(200).send("Producto borrado: " + title)
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(400).json({msj:`ERROR: ${error.stack}`});
        }
        }

    module.exports = {
        getProduct,
        updateProduct,
        deleteProduct,
        createProduct
    };