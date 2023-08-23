function handleTransactionCases(orderData) {
  const errorDetail = orderData?.details?.[0];
  if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
    // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
    // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
    return actions.restart();
  } else if (errorDetail) {
    // (2) Other non-recoverable errors -> Show a failure message
    throw new Error(
      `${errorDetail.description} (${orderData.debug_id})`,
    );
  } else if (!orderData.purchase_units) {
    throw new Error(JSON.stringify(orderData));
  }
  else {
    // (3) Successful transaction -> Show confirmation or thank you message
    // Or go to another URL:  actions.redirect('thank_you.html');
    const transaction =
      orderData.purchase_units[0].payments.captures[0];
    resultMessage(
        `<h3>Transaction ${transaction.status}: ${transaction.id}<br><br>See console for all available details</h3>`,
      );
      console.log(
        'Capture result',
        orderData,
        JSON.stringify(orderData, null, 2),
      );
    }
}

async function onCreateOrder() {
  try {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      // use the "body" param to optionally pass additional order information
      // like product ids and quantities
      body: JSON.stringify({
        cart: [
          {
            id: 'YOUR_PRODUCT_ID',
            quantity: 'YOUR_PRODUCT_QUANTITY',
          },
        ],
      }),
    });

    const orderData = await response.json();

    if (orderData.id) {
      return orderData.id;
    } else {
      const errorDetail = orderData?.details?.[0];
      const errorMessage = errorDetail
        ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
        : JSON.stringify(orderData);

      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error(error);
    resultMessage(
      `Could not initiate PayPal Checkout...<br><br>${error}`,
    );
  }
}

async function onCaptureOrder(orderID) { 
  try {
    const response = await fetch(`/api/orders/${orderID}/capture`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const orderData = await response.json();
    handleTransactionCases(orderData);
  } catch (error) {
    console.error(error);
  }
}

/*
Example function to show a result to the user. Your site's UI library can be used instead,
however alert() should not be used as it will interrupt the JS SDK window
*/

function resultMessage(message) {
  const container = document.getElementById('paypal-button-container');
  const p = document.createElement('p');
  p.innerHTML = message;
  container.parentNode.appendChild(p);
}

paypal.Buttons({
    style: {
    shape: 'rect',
    // color:'blue' change the default color of the buttons
    layout: 'vertical', // default value. Can be changed to horizontal
  },
    createOrder: onCreateOrder,
    onApprove: async (data) => onCaptureOrder (data.orderID),
  })
  .render("#paypal-button-container");

// If this returns false or the card fields aren't visible, see Step #1.
if (paypal.HostedFields.isEligible()) {
  let orderId;

  // Renders card fields
  paypal.HostedFields.render({
    // Call your server to set up the transaction
    createOrder: async (data, actions) => {
      orderId = await onCreateOrder(data, actions);
      return orderId;
    },
    styles: {
      ".valid": {
        color: "green",
      },
      ".invalid": {
        color: "red",
      },
    },
    fields: {
      number: {
        selector: "#card-number",
        placeholder: "4111 1111 1111 1111",
      },
      cvv: {
        selector: "#cvv",
        placeholder: "123",
      },
      expirationDate: {
        selector: "#expiration-date",
        placeholder: "MM/YY",
      },
    },
  }).then((cardFields) => {
    document.querySelector("#card-form").addEventListener("submit", async (event) => {
        event.preventDefault();
        try {
          const { value: cardHolderName } = document.getElementById("card-holder-name");
          const { value: postalCode } = document.getElementById("card-billing-address-zip");
          const { value: countryCodeAlpha2 } = document.getElementById("card-billing-address-country");

          await cardFields.submit({
            cardHolderName,
            billingAddress: {
              postalCode,
              countryCodeAlpha2,
            },
          });

          await onCaptureOrder (orderId);
        } catch (error) {
          alert("Payment could not be captured! " + JSON.stringify(error));
        }
      });
  });
// } else {
//   // Hides card fields if the merchant isn't eligible
//   document.querySelector("#card-form").style = "display: none";
}