![PayPal Developer Cover](https://github.com/paypaldev/.github/blob/main/pp-cover.png)
<div align="center">
  <a href="https://twitter.com/paypaldev" target="_blank">
    <img alt="Twitter: PayPal Developer" src="https://img.shields.io/twitter/follow/paypaldev?style=social" />
  </a>
  <br />
  <a href="https://twitter.com/paypaldev" target="_blank">Twitter</a>
    <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
  <a href="https://www.paypal.com/us/home" target="_blank">PayPal</a>
    <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
  <a href="https://developer.paypal.com/home" target="_blank">Docs</a>
    <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
  <a href="https://github.com/paypaldev" target="_blank">Code Samples</a>
    <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
  <a href="https://dev.to/paypaldeveloper" target="_blank">Blog</a>
  <br />
  <hr />
</div>

# PayPal JavaScript FullStack Advanced Checkout
This sample app shows you how to build and customize a card payment form to accept debit and credit cards. Style the card form so that it aligns with your business branding.

To create this application from scratch, follow the [Advanced Checkout integration](https://developer.paypal.com/docs/checkout/advanced/integrate) guide from the [PayPal Developer](https://developer.paypal.com/home) docs.


### Run this App

You can run this app locally or on [Stackblitz](https://stackblitz.com/edit/pp-js-node?file=README.md).

#### Run it locally

- Rename the `.env.example` file to .env.
Complete the steps in [Get started](https://developer.paypal.com/api/rest/) to get the following sandbox account information from the Developer Dashboard:
- Sandbox client ID and the secret of [a REST app](https://www.paypal.com/signin?returnUri=https%3A%2F%2Fdeveloper.paypal.com%2Fdeveloper%2Fapplications&_ga=1.252581760.841672670.1664266268).
- Access token to use the PayPal REST API server.
- Inside the `.env` file, enter your PayPal client ID for the `PAYPAL_CLIENT_ID` and your PayPal app secret for the `PAYPAL_CLIENT_SECRET` environment variables.
![paypal developer credentials](env.png)
- Run npm install in your terminal
- In the `checkout.ejs` replace the `PAYPAL_CLIENT_ID` string in the  `script` tag with your PayPal Client ID.

Now, run the following commands in your terminal:

`npm install`

`npm run start`

and navigate in your browser to: `http://localhost:9597/`.

### Sample Card

Card Type: `Visa`

Card Number: `4032039534213337`

Expiration Date: `01/2025`

CVV: `123`

## PayPal Developer Community
The PayPal Developer community helps you build your career while improving your products and the developer experience. You’ll be able to contribute code and documentation, meet new people and learn from the open-source community.
 
* Website: [developer.paypal.com](https://developer.paypal.com)
* Twitter: [@paypaldev](https://twitter.com/paypaldev)
* GitHub:  [@paypal](https://github.com/paypal)
