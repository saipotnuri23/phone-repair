import React, { useEffect, useState } from 'react';
import './MyOrders.css';


const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  

  useEffect(() => {
    console.log('📦 MyOrders component mounted');

    // Example dummy data
    setOrders([
      {
        id:'order1',
        type: 'accessory',
        items: [{ name: 'Headphones' }],
        date: new Date(),
        status: 'Delivered',
        total: 999
      },
      {
        id:'order2',
        type: 'repair',
        issues: ['Battery issue'],
        date: new Date(),
        status: 'Pending',
        total: 1299
      },
      {
        id:'order3',
        type: 'accessory',
        items: [{ name: 'Charger' }],
        date: new Date(),
        status: 'Cancelled',
        total: 499
      }
    ]);
  }, []);

  const currentOrders = orders.filter(order =>
    ['Pending', 'Processing', 'In Progress'].includes(order.status)
  );

  const pastOrders = orders.filter(order =>
    ['Delivered', 'Cancelled'].includes(order.status)
  );
  

  const renderOrders = (title, list) => (
    <>
      <h3 className="mo-section-heading">{title}</h3>
      {list.length === 0 ? (
        <p className="mo-no-orders">No {title.toLowerCase()} available.</p>
      ) : (
        <div className="mo-orders-list">
          {list.map((order, index) => (
            <div key={index} className="mo-order-card">
              <div className="mo-order-header">
                <h4>{order.type === 'repair' ? 'Repair Order' : 'Accessory Order'}</h4>
                <span className={`mo-status ${order.status.toLowerCase().replace(/\s/g, '-')}`}>
                  {order.status}
                </span>
              </div>

              <div className="mo-order-details">
                <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                {order.items && <p><strong>Items:</strong> {order.items.map(i => i.name).join(', ')}</p>}
                {order.issues && <p><strong>Issues:</strong> {order.issues.join(', ')}</p>}
                <p><strong>Total:</strong> ₹{order.total}</p>
              </div>

              <div className="mo-order-footer">
                <button className="mo-view-btn">View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );

  return (
    <div className="mo-orders-page">
      <h2 className="mo-title">My Orders</h2>
      {orders.length === 0 ? (
        <p className="mo-no-orders">You haven't placed any orders yet.</p>
      ) : (
        <>
          {renderOrders("Current Orders", currentOrders)}
          {renderOrders("Purchased Orders", pastOrders)}
        </>
      )}
    </div>
  );
};

export default MyOrders;
