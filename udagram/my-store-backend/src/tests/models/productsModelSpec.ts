import { ProductsStore, Product } from "../../models/products";

const productsStore = new ProductsStore();
const newProduct:Product = { id: 2, name: 'X5', price:15000, description: 'Cars', url: ""  };
describe('Test model for products', () => {
    it('calling all the methods with correct parameters [HAPPY PATH]', async () => {
        const products = await productsStore.getProducts();
        expect(products.length).toEqual(1);
        const product = await productsStore.getProduct(1);
        const expectedProduct = { id: 1, name: 'AirCleaner', price: '2', category: 'Appliances' };
        //@ts-ignore
        expect(product).toEqual(expectedProduct);

        const productsByCategory = await productsStore.getProductsByCategory('Appliances');
        expect(productsByCategory.length).toEqual(1);
        expect(productsByCategory[0].name).toEqual('AirCleaner');

        const addedProduct = await productsStore.createProduct(newProduct);
        expect(addedProduct.name).toEqual('X5');
    });

    it('calling some of the methods with incorrect parameters [unHAPPY PATH]', async () => {
        // Non-existent product
        const product = await productsStore.getProduct(3);
        expect(product).toBeFalsy();

        // Non-existent category
        const productsByCategory = await productsStore.getProductsByCategory('Drinks');
        expect(productsByCategory.length).toEqual(0);
        
    });
});