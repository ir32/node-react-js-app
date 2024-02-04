// PaymentPage.js
import React from 'react';

const PaymentPage = ({ product }) => {
  const amount = 600;
  const currency = "INR";
  const receiptId = "qwsaq1";

  const paymentHandler = async (e) => {
    try {
      const response = await fetch("http://localhost:3000/initiate_razorpay_payment", {
        method: "POST",
        body: JSON.stringify({
          amount,
          currency,
          receipt: receiptId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const order = await response.json();
      console.log(order);
      var options = {
        key: order.key_id,
        amount, 
        currency,
        name: "Acme Corp", 
        description: "Test Transaction",
        order_id: order.orderId,  
        handler: async function (response) {
          const body = {
            ...response,
          };

          const validateRes = await fetch(
            "http://localhost:3000/order/validate", // Change the endpoint to your server's validate route
            {
              method: "POST",
              body: JSON.stringify(body),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const jsonRes = await validateRes.json();
          console.log(jsonRes);
        },
        prefill: {
          name: "Web Dev Matrix",
          email: "alamirfan1092@gmail.com",
          contact: "8240494754",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();
      e.preventDefault();
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <div className="product">
      <h2>Tshirt</h2>
      <p>Solid blue cotton Tshirt</p>
      <br />
      <button onClick={paymentHandler}>Pay</button>
    </div>
  );
};

export default PaymentPage;
