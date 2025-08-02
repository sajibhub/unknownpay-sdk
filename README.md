# UnknownPay Payment Integration

![UnknownPay Banner](https://via.placeholder.com/1200x400?text=UnknownPay+Secure+Payments)  
Secure, mobile-first payment solutions with both direct API and SDK integration options.

## 🔑 Features

- **Dual Integration**: Choose between direct API or SDK
- **Mobile Optimized**: Built for bKash-style flows
- **End-to-End Encryption**: Secure OTP and PIN verification
- **Real-Time Validation**: Instant payment status updates
- **TypeScript Support**: First-class TS support in SDK
- **Comprehensive Docs**: Clear examples for all use cases

## 📦 Installation Options

### Option 1: Official SDK

```bash
npm install unknown_pay_nodejs
# or
yarn add unknown_pay_nodejs
```

## 🛠️ SDK Usage

🔹 Initialization

```
const { createPayment, validatePayment } = require('unknownpay-sdk');
```

## 1. Create Payment

```
router.post('/create-payment', async (req, res) => {
  try {
    const payment = await createPayment(
      SECRET_KEY,
      {
        amount: 150,
        options_1: "ORDER-1001",
        options_2: "user@example.com",
        callback: "https://yourdomain.com/api/payment/callback",
        tran_id: "txn-ABC123456"
      }
    );

    // Respond with payment URL and details
    res.status(200).json(payment);

  } catch (error) {
    console.error('Create Payment Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});
```

## 2. Payment Callback Handler

```
router.post('/payment-callback', async (req, res) => {
  try {
    const { id: paymentId } = req.body;

    const result = await validatePayment(SECRET_KEY, paymentId);

    if (result.status === 'completed') {
      // ✅ Update your database or order status here

      return res.status(200).json({
        redirect: "https://yourdomain.com/payment/success"
      });
    } else {
      return res.status(200).json({
        redirect: "https://yourdomain.com/payment/failed"
      });
    }

  } catch (error) {
    console.error('Callback validation error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

```

# Option 2: Direct API Integration

No installation required - make direct HTTP requests.
Main URL

```
https://secure.unknownpay.sajib.xyz/api/v1/payment/
```

## 🌍 Payment Create

```text
const createPayment = async () => {
  try {
    const response = await axios.post(
      'https://secure.unknownpay.sajib.xyz/api/v1/payment/create',
      {
        amount: 150,
        options_1: "ORDER-1001",
        options_2: "user@example.com",
        callback: "https://yourdomain.com/api/payment/callback",
        tran_id: "txn-ABC123456"
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'secret': 'your-merchant-secret-key'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Payment creation failed:', error.response?.data || error.message);
  }
};
```

Headers:

```headers
{
    'Content-Type': 'application/json',
    'secret': 'your-merchant-secret-key'
}
```

Request Body:

```json
{
  "amount": 150,
  "options_1": "ORDER-1001",
  "options_2": "user@example.com",
  "callback": "https://yourdomain.com/callback",
  "tran_id": "txn-ABC123456"
}
```

Response:

```

{
  "url": "https://pay.unknownpay.sajib.xyz?hash=..."
}

```

## CallBack Handle

after payment failed or sucess return body in callback request

```
app.post('/api/payment/callback', async (req, res) => {
  try {
    const { id } = req.body;

    const response = await axios.post(
      'https://secure.unknownpay.sajib.xyz/api/v1/payment/validate',
      { id, secret: 'your-merchant-secret-key' },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const result = response.data;
if (result.status === 'completed') {
      // ✅ Update your database or order status here

      return res.status(200).json({
        redirect: "https://yourdomain.com/payment/success"
      });
    } else {
      return res.status(200).json({
        redirect: "https://yourdomain.com/payment/failed"
      });
    }

  } catch (error) {
    console.error('Validation error:', error);
    res.status(500).send('Internal Server Error');
  }
});

```

Headers:

```headers
{
    'Content-Type': 'application/json',
    'secret': 'your-merchant-secret-key'
}
```

Request Body:

```json
{
  "id": "payment-id"
}
```

Response:

```json
{
  "status": "completed",
  "number": "01XXXXXXXXX",
  "amount": 150,
  "tran_id": "txn-ABC123456",
  "options_1": "ORDER-1001",
  "options_2": "user@example.com"
}
```

### 🔄 Payment Flow Diagram

![🔄 Payment Flow Diagram](https://sajib.xyz/unknownpay/Payment_Flow_Diagram.png)

## ❓ Frequently Asked Questions

**Q: How long are payment sessions valid?**  
A: 30 minutes from creation.

**Q: Can I reuse transaction IDs?**  
A: No, each transaction ID must be unique.

**Q: Is HTTPS required for callbacks?**  
A: Yes, for security all callbacks must use HTTPS.

---

## 📞 Support

Need help with integration?

- **Email**: [mohammadsajib996@gmail.com](mailto:mohammadsajib996@gmail.com)
- **Slack**: Join our developer workspace
- **Issues**: [GitHub issue tracker](https://github.com/sajibhub/unknown_pay_nodejs/issues)

---

## 📄 License

**License**: MIT  
© 2025 UnknownPay. All rights reserved.
