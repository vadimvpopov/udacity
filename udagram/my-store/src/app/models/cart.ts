import { OrderItem } from "./order_item"

export class Cart {
    orderItems: OrderItem[] = [];
    fullName: string = "";
    address: string = "";
    creditCardNumber: string = "";
    total: number = 0;

    addToCart(orderItem: OrderItem) {
        let existingOrder = this.orderItems.find(item => item.product?.id === orderItem.product?.id);
        if (existingOrder === undefined) {
            this.orderItems.push(orderItem);
        } else {
            existingOrder.quantity += orderItem.quantity;
        }
        this.updateTotal();
    }

    updateTotal(): void {
        this.orderItems = this.orderItems.filter(orderItem => orderItem.quantity > 0);
        const total = this.orderItems.reduce((acc, val) => acc + val.product?.price * val.quantity, 0); 
        this.total = Math.ceil(total * 100) / 100;
    }
}