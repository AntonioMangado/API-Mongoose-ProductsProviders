const Provider = require("../models/providers.models")

    // READ
    const getProvider = async (req, res) => {
    try {
        const id = req.params.id || "";
        let providers = id ? await Provider.find({_id: id}, "-__v") : await Provider.find({}, "-__v") ; //{}
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
        console.log(req.body.company_name)
        let answer = await new Provider(data).save();
        res.status(201).json({message: "Proveedor creado", provider: answer});

    }catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({msj:`ERROR: ${error.stack}`});
    }
    }   

    // Update
    const updateProvider = async (req, res) => {
        try {
            // console.log(req.params.id)
            const id = req.params.id || "";
            const data = req.body;
            id ? await Provider.updateOne({_id: id}, data) : Provider.updateMany({}, { $set: data });
            res.status(200).json({message: "Proveedor editado", provider: await Provider.find({_id: id})})
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(400).json({msj:`ERROR: ${error.stack}`});
        }
        }


    // let deletedProvider = {
    //     "company_name": "Decathlon"
    // }

    // Delete
    const deleteProvider = async (req, res) => {
        try {
            const name = req.body.company_name || "";
            name ? await Provider.deleteOne({company_name: name}) : await Provider.deleteMany({}) ; //{}
            res.status(200).send("Proveedor borrado: " + name)
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(400).json({msj:`ERROR: ${error.stack}`});
        }
        }

    module.exports = {
        getProvider,
        updateProvider,
        deleteProvider,
        createProvider
    };