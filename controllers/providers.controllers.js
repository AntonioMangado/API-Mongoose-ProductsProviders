const Provider = require("../models/providers.models")

    // Read
    const getProvider = async (req, res) => {
    try {
        const id = req.params.id || "";
        let providers = id ? await Provider.find({id}, "-_id -__v") : await Provider.find({}, "-_id -__v") ; //{}
        res.status(200).json(providers); // Respuesta de la API para 1 producto
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({msj:`ERROR: ${error.stack}`});
    }
    }

    // CREATE
    const createProvider = async (req, res) => {
    console.log(req.body);

    try{
        const data = req.body;
        let answer = await new Provider(data).save();
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

    // // Delete
    // const deleteProvider = async (req, res) => {
    //     try {
    //         const name = req.params.name || "";
    //         let providers = name ? await Provider.deleteOne({id}) : await Provider.find({}, "-_id -__v") ; //{}
    //         res.status(200).json(providers); // Respuesta de la API para 1 producto
    //     }
    //     catch (error) {
    //         console.log(`ERROR: ${error.stack}`);
    //         res.status(400).json({msj:`ERROR: ${error.stack}`});
    //     }
    //     }

    module.exports = {
        getProvider,
        updateProduct,
        // deleteProvider,
        createProvider
    };