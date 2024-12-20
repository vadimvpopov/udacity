import Client from '../database'
import { Product } from './products'

export type OrderItem = {
    productId: Number;
    productName: String;
    quantity: Number;
}
export type Order = {
    id: Number;
    userId: Number;
    status: String;
    items: OrderItem[];
}

function groupOrderItems(orderItems:any[]): Order[] {
    const map = new Map();
    orderItems.forEach((item) => {
        //console.log(`item from DB: ${item}`)
         const key = item['orderid'];
         let order:Order = map.get(key);
         if (!order) {
            order = {
                id: key,
                userId: item['userid'],
                status: item['status'],
                items: []
            }
            map.set(key, order);
         }
         const orderItem:OrderItem = {
            productId: item['productid'],
            productName: item['name'],
            quantity: item['quantity']
         };
         order.items.push(orderItem); 
    });
    return Array.from(map.values());
}

export class OrdersStore {
    
    async getOrders(userId:number): Promise<Order[]> {
        try {
            const sql = 'SELECT o.id orderId, o.userId userId, o.status status, oi.productId productId, oi.quantity quantity, p.name FROM orders o ' +
                        'INNER JOIN orderItems oi ON o.id = oi.orderId ' + 
                        'INNER JOIN Products p ON oi.productId = p.id ' + 
                        'WHERE userId=$1;';
            //@ts-ignore
            const conn = await Client.connect();
            const result = await conn
                .query(sql, [userId]);
            const resOrders = groupOrderItems(result.rows);
            conn.release();
            return resOrders;
        } catch (err) {
            throw new Error(`Could not return list of orders for the given user: ${err}`)
        }
    }

    async getCurrentOrder(userId:number): Promise<Order|null> {
        try {
            const sql = 'SELECT o.id orderId, o.userId userId, o.status status, oi.productId productId, oi.quantity quantity, p.name nm FROM orders o ' +
                        'INNER JOIN orderItems oi ON o.id = oi.orderId ' + 
                        'INNER JOIN Products p ON oi.productId = p.id ' + 
                        'WHERE userId=$1 AND o.status = \'ACTIVE\';';
            //@ts-ignore
            const conn = await Client.connect();
            const result = await conn
                .query(sql, [userId]);
            const resOrder = groupOrderItems(result.rows);
            conn.release();
            return resOrder[0];
        } catch (err) {
            throw new Error(`Could not return current order for the given user: ${err}`)
        }
    }

    async addProductToCurrentOrder(userId: number, productId: number, quantity: number): Promise<number> {
        try {
            console.log(`Input parameters for adding order item: ${userId}, ${productId}, ${quantity}`);
            const sqlGetOrder = 'SELECT * FROM orders WHERE userId=$1 and status != \'CLOSED\';';
            //@ts-ignore
            const conn = await Client.connect();
            let result = await conn
                .query(sqlGetOrder, [userId]);
            if (!result.rows || result.rows.length === 0) {
                console.log('no current order for user is found, inserting new order');
                const sqlInsertNewOrder = 'INSERT INTO orders (userId, status) VALUES ($1, $2) RETURNING *';
                result = await conn.query(sqlInsertNewOrder, [userId, 'ACTIVE']);
            } 
            console.log(result.rows);
            const orderId = result.rows[0]['id'];
            console.log(`Found order id ${orderId}`);
            const sqlInsertNewProduct = 'INSERT INTO orderItems (orderId, productId, quantity) VALUES ($1, $2, $3) RETURNING *';
            const resultProduct = await conn.query(sqlInsertNewProduct, [orderId, productId, quantity]);
            conn.release();
            return resultProduct.rows[0]['orderId'];
        } catch (err) {
            throw new Error(`Could not add product to the users order: ${err}`)
        }
    }

    async closeOrder(userId: number): Promise<number|null> {
        try {
            const sqlUpdateOrder = 'UPDATE orders SET status=\'CLOSED\' WHERE userId=$1 and status != \'CLOSED\' RETURNING *';
            //@ts-ignore
            const conn = await Client.connect();
            const result = await conn.query(sqlUpdateOrder, [userId]);
            const resOrderId = result.rows[0];
            conn.release();
            return resOrderId;
        } catch (err) {
            throw new Error(`Could not close current order for the given user: ${err}`)
        }
    }

}