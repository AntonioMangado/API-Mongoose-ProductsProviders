const Product = require("../models/products.models")

    // Read
    const getProduct = async (req, res) => {
    try {
        const id = req.params.id || "";
        let products = id ? await Product
                                    .find({id}, "-_id -__v")
                                    .populate("Provider") : 
            await Product
                    .find({}, "-_id -__v")
                    .populate("Provider") ; //{}
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
        res.status(400).json({msj:`ERROR: invalid body format`});
    }
    }   

    // Update
    const updateProduct = async (req, res) => {
        try {
            const id = req.params.id || "";
            const data = req.body;
            if (req.params.id != "") {
                const product = await Product.find({_id: id})
                if (product != null) {
                    await Product.updateOne({_id: id}, data)
                    res.status(200).json({message: "Producto editado", product: await Product.find({_id: id})})
                    } else {
                    res.status(404).send("Producto no encontrado: " + req.params.id)
                    }
            } 
            // else {
            // await Product.updateMany({}, { $set: data });
            // res.status(200).json({message: "Productos editados"})
            // }
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(400).json({msj:`ERROR: invalid body format`});
        }
        }

     // Delete
     const deleteProduct = async (req, res) => {
        try {
            const productTitle = req.body.title || "";
            const product = await Product.findOne({title: productTitle});
                if (product != null) {
                    await Product.deleteOne({title: productTitle})
                    res.status(200).send("Producto borrado: " + productTitle)

                } else if (product == null && req.body.title) {
                        res.status(404).send("Producto no encontrado: " + productTitle)

                } else if (product == null && !req.body.title) {
                        await Product.deleteMany({})
                        res.status(200).send("Todos los productos borrados")
                }
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(400).json({msj: error});
        }
        }

    module.exports = {
        getProduct,
        updateProduct,
        deleteProduct,
        createProduct
    };