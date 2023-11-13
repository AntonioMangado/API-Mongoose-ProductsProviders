const Product = require("../models/products.models")

    // Read
    const getProduct = async (req, res) => {
    try {
        const id = req.params.id || "";
        let products = id ? await Product.find({id}, "-_id -__v") : await Product.find({}, "-_id -__v") ; //{}
        res.status(200).json(products); // Respuesta de la API para 1 producto
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
        res.status(201).json(answer);

    }catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({msj:`ERROR: ${error.stack}`});
    }
    }   

    // Update
    const updateProduct = (req, res) => {
        res.status(200).send("Producto editado!");
    }

    // Delete
    const deleteProduct = (req, res) => {
        res.status(200).send("Producto borrado!");
    }

    module.exports = {
        getProduct,
        updateProduct,
        deleteProduct,
        createProduct
    };