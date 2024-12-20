import Client from '../database'
import fs from 'fs';
import path from 'path';

// id serial primary key, name text not null, price decimal not null, category varchar(20)
export type Product = {
    id?: Number;
    name: String;
    price: Number;
    url: String;
    description: String;
}

export class ProductsStore {
    async prepopulateProducts(): Promise<void> {
        try {
            console.log("Prepopulating products");
            const products:Product[] = await this.getProducts();
            console.log(`Products found ${products}`);
            if (products.length == 0) {
                const rootPath = process.cwd(); 
                console.log('Root Path:', rootPath);
                const filePath = path.join(rootPath, 'assets/data.json');
                fs.readFile(filePath, 'utf8', (err, data) => { 
                    if (err) { 
                        console.error('Error reading file:', err); return; 
                    } 
                    try { 
                        const jsonProducts = JSON.parse(data) as Array<Product>; 
                        console.log('Parsed JSON:', jsonProducts); 
                        jsonProducts.forEach((product) => { 
                            console.log('Product:', product);
                            this.createProduct(product); 
                        });
                    } catch (parseError) { 
                        console.error('Error parsing JSON:', parseError); 
                    } 
                });
            }

        } catch (err) {
            console.log("Couldn't prepopulate products");
            throw new Error(`Could not return list of products: ${err}`)
        }
    }
    
    async getProducts(): Promise<Product[]> {
        try {
            const sql = 'SELECT * FROM products;';
            //@ts-ignore
            const conn = await Client.connect();
            const result = await conn
                .query(sql);
            const resProducts = result.rows;
            conn.release();
            return resProducts;
        } catch (err) {
            throw new Error(`Could not return list of products: ${err}`)
        }
    }

    async getProduct(id:number): Promise<Product|null> {
        try {
            const sql = 'SELECT * FROM products WHERE id=$1';
            //@ts-ignore
            const conn = await Client.connect();
            const result = await conn
                .query(sql, [id]);
            conn.release();
            if (result.rows.length > 0) {
                const resProduct = result.rows[0];
                //console.log(`found product: ${resProduct}`);
                return resProduct;
            }
            console.log(`Product ${id} not found`);
            return null;
        } catch (err) {
            throw new Error(`Could not get data for product with id: ${id}: ${err}`)
        }
    }

    async createProduct(pr:Product): Promise<Product> {
        try {
            const sql = 'INSERT INTO products (name, price, url, description) VALUES($1, $2, $3, $4) RETURNING *'
            //@ts-ignore
            const conn = await Client.connect();
            const result = await conn
                .query(sql, [pr.name, pr.price, pr.url, pr.description]);
            const resProduct = result.rows[0];
            conn.release();
            return resProduct;
        } catch (err) {
            throw new Error(`Could not create product ${pr.name} ${pr.description}: ${err}`)
        }
    }

    async getMostPopularProducts(): Promise<Product[]> {
        try {
            const sql = 'SELECT oi.productId, sum(oi.quantity) q, p.name  ' +
                        'FROM orderitems oi INNER JOIN products p ON oi.productId = p.id ' +
                        'GROUP BY oi.productId, p.name  ' + 
                        'ORDER BY q DESC LIMIT 5;';
            //@ts-ignore
            const conn = await Client.connect();
            const result = await conn
                .query(sql);
            const resProducts = result.rows;
            conn.release();
            return resProducts;
        } catch (err) {
            throw new Error(`Could not return list of the most popular products: ${err}`)
        }
    }

    async getProductsByCategory(category:string): Promise<Product[]> {
        try {
            const sql = 'SELECT * FROM products WHERE category=$1;';
            //@ts-ignore
            const conn = await Client.connect();
            const result = await conn
                .query(sql, [category]);
            //console.log(`Products by category: ${result.rows}`)
            const resProducts = result.rows;
            conn.release();
            return resProducts;
        } catch (err) {
            throw new Error(`Could not return list of products for category ${category}: ${err}`)
        }
    }
}