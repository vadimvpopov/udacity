import express from 'express';
import { Product, ProductsStore } from '../../models/products';
import { verifyAuthToken, strToNumeric } from '../../utilities/utils';

const productsRouter = express.Router();
const productsStore = new ProductsStore();
productsStore.prepopulateProducts();

const getProducts = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        //console.log("body: ", req.body);
        const products = await productsStore.getProducts();
        res.json(products);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }   
}

const getProduct = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        //console.log("getProduct: body: ", req.body);
        const productId = strToNumeric(req.params.id);
        const product = await productsStore.getProduct(productId);
        if (!product) {
            res.status(404).json('No product found');
            return;
        }
        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}

const createProduct = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        //console.log("body: ", req.body);
        const productId = strToNumeric(req.params.id);
        const product: Product = {
            name: req.body.name,
            price: strToNumeric(req.body.price),
            description: req.body.description,
            url: req.body.url
        };
        const resProduct = await productsStore.createProduct(product);
        res.json(resProduct);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}

const mostPopularProducts = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        //console.log("body: ", req.body);
        const products = await productsStore.getMostPopularProducts();
        res.json(products);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}

const productsByCategory = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        //console.log("body: ", req.body);
        const category = req.params.category;
        const products = await productsStore.getProductsByCategory(category);
        res.json(products);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}

productsRouter.get('/', getProducts);
productsRouter.get('/show/:id', getProduct);
productsRouter.post('/', verifyAuthToken, createProduct);
productsRouter.get('/most-popular-products', mostPopularProducts);
productsRouter.get('/category-products/:category', productsByCategory);


export default productsRouter;