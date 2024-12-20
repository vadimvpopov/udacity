import { OrdersStore } from "../../models/orders";
import { ProductsStore } from "../../models/products";

const orderStore = new OrdersStore();
const productsStore = new ProductsStore();

describe('Test model for orders', () => {
    it('adding a product for user and getting the list of orders for them returns 1 order [HAPPY PATH]', async () => {
        const currentOrderForUser = await orderStore.getCurrentOrder(2);
        expect(currentOrderForUser).toBeFalsy();
        await orderStore.addProductToCurrentOrder(2,1,5);
        const ordersForUser = await orderStore.getOrders(2);
        const popularProducts = await productsStore.getMostPopularProducts();
        expect(popularProducts[0].name).toEqual('AirCleaner');
        expect(ordersForUser.length).toEqual(1);
        const newCurrentOrderForUser = await orderStore.getCurrentOrder(2);
        expect(newCurrentOrderForUser).toBeTruthy();
        await orderStore.closeOrder(2);
        const currentOrderForUserAfterClosing = await orderStore.getCurrentOrder(2);
        expect(currentOrderForUserAfterClosing).toBeFalsy();
    });

    
    it('calling methods with wrong params', async () => {

        // Get list of orders for non-existent user
        const orders = await orderStore.getOrders(5);
        expect(orders.length).toEqual(0);

        // Get the current order for non-existent user
        const curOrder = await orderStore.getCurrentOrder(5);
        expect(curOrder).toBeFalsy();
        // Add product to non-existent user
        await expectAsync(orderStore.addProductToCurrentOrder(3,1,5)).toBeRejected();
        // Add Non existent product
        await expectAsync(orderStore.addProductToCurrentOrder(2,10,5)).toBeRejected();
        // Close non-existent order
        const closedOrderId = await orderStore.closeOrder(5);
        expect(closedOrderId).toBeFalsy();
    });
});