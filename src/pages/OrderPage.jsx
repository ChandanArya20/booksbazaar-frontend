import '../css/order_page.css'
import OrderItem from '../components/OrderItem';

const OrderPage = () => {
    const orders = [
        {
          orderId: 1,
          bookImage: 'path/to/book1.jpg',
          bookTitle: 'Book 1 Title',
          bookAuthor: 'Author 1',
          quantity: 2,
          deliveryDate: '2023-08-10',
          deliveryStatus: 'Delivered',
          deliveryAddress: '123 Main St, City, Country',
        }
    ]

  return (
    <div className="order-page">
      <h2>All Orders</h2>
      <div className="order-list">
        {orders.map((order) => (
          <OrderItem key={order.orderId} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
