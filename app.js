// unknownpay-sdk.js
import axios from 'axios';

const BASE_URL = 'https://secure.unknownpay.sajib.xyz/api/v1/payment';

/**
 * Create a new payment.
 * @param {string} secret - Your merchant secret key.
 * @param {object} config - Payment configuration.
 * @param {number} config.amount - Amount to be paid.
 * @param {string} config.callback - Callback URL after payment.
 * @param {string} config.tran_id - Unique transaction ID.
 * @param {string} [config.options_1] - Optional field 1.
 * @param {string} [config.options_2] - Optional field 2.
 * @returns {Promise<object>} - Returns payment URL and transaction info.
 */
export const createPayment = async (secret, config) => {
  // Manual validation
  if (!secret) throw new Error("Missing required parameter: secret");
  if (!config || typeof config !== 'object') throw new Error("Invalid payment config");
  if (!config.amount || !config.callback || !config.tran_id) {
    throw new Error("Missing required fields: amount, callback, tran_id");
  }

  try {
    const response = await axios.post(`${BASE_URL}/create`, config, {
      headers: {
        'Content-Type': 'application/json',
        'secret': secret
      },
      timeout: 10000
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Payment failed: ${error.response?.status} - ${error.response?.data?.message || 'Unknown error'}`);
    }
    throw new Error('Payment failed: Network error');
  }
};

/**
 * Validate an existing payment.
 * @param {string} secret - Your merchant secret key.
 * @param {string} paymentId - The ID of the payment to validate.
 * @returns {Promise<object>} - Returns payment status and details.
 */
export const validatePayment = async (secret, paymentId) => {
  if (!secret) throw new Error("Missing required parameter: secret");
  if (!paymentId) throw new Error("Missing required parameter: paymentId");

  try {
    const response = await axios.post(`${BASE_URL}/validate`, { id: paymentId }, {
      headers: {
        'Content-Type': 'application/json',
        'secret': secret
      },
      timeout: 10000
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Validation failed: ${error.response?.status} - ${error.response?.data?.message || 'Unknown error'}`);
    }
    throw new Error('Validation failed: Network error');
  }
};

// Optional default export
export default {
  createPayment,
  validatePayment
};
