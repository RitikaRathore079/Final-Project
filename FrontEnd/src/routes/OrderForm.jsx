import React from "react";

const OrderForm = ({ products, onPlaceOrder }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      items: products.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        quantity: p.quantity,
      })),
      totalPrice: products.reduce((total, p) => total + p.price * p.quantity, 0),
    };
    onPlaceOrder(orderData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Place Full Cart Order
      </button>
    </form>
  );
};

export default OrderForm;
