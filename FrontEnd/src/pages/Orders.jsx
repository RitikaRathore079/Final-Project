
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaTimes } from "react-icons/fa";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:5000/api/orders",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setOrders(res.data); // backend se current user ke orders aayenge
//       } catch (err) {
//         console.log("Error fetching orders:", err);
//       }
//     };

//     fetchOrders();
//   }, [token]);

//   const handleCancel = async (orderId) => {
//     try {
//       await axios.delete(
//         `http://localhost:5000/api/orders/${orderId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       // frontend state update
//       setOrders(orders.filter(order => order._id !== orderId));
//     } catch (err) {
//       console.log("Cancel order failed:", err);
//       alert("Failed to cancel order");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
//       <div className="bg-white w-full max-w-3xl rounded-xl shadow-md p-6">

//         <h2 className="text-xl font-semibold mb-6">My Orders</h2>

//         {orders.length > 0 ? (
//           orders.map(order => (
//             <div key={order._id} className="border rounded-lg p-4 mb-4 bg-gray-50 relative">
//               <p className="font-semibold">Total: ₹{order.totalPrice}</p>
//               <p className="text-sm text-gray-500">
//                 Date: {new Date(order.createdAt).toLocaleDateString()}
//               </p>

//               <div className="mt-2">
//                 {order.items.map((item, i) => (
//                   <p key={i} className="text-sm">
//                     {item.name} × {item.qty}
//                   </p>
//                 ))}
//               </div>

//               {/* Cancel Button */}
//               <button
//                 onClick={() => handleCancel(order._id)}
//                 className="absolute top-2 right-2 text-red-600 hover:text-red-800 flex items-center gap-1"
//               >
//                 <FaTimes /> Cancel
//               </button>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No orders found</p>
//         )}

//       </div>
//     </div>
//   );
// };

// export default Orders;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/orders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(res.data);
      } catch (err) {
        console.log("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [token]);

  const handleCancel = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/orders/${orderId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update frontend
      setOrders(orders.filter(order => order._id !== orderId));
    } catch (err) {
      console.log("Cancel order failed:", err);
      alert("Failed to cancel order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">My Orders</h2>

        {orders.length > 0 ? (
          orders.map(order => (
            <div key={order._id} className="border rounded-lg p-4 mb-4 bg-gray-50 relative">
              <p className="font-semibold">Total: ₹{order.totalPrice}</p>
              <p className="text-sm text-gray-500">
                Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>

              <div className="mt-2">
                {order.items.map((item, i) => (
                  <p key={i} className="text-sm">
                    {item.name} × {item.qty}
                  </p>
                ))}
              </div>

              {/* Cancel Button */}
              <button
                onClick={() => handleCancel(order._id)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800 flex items-center gap-1"
              >
                <FaTimes /> Cancel
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No orders found</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
