import { Linking } from 'react-native';
import * as LinkingCompat from 'expo-linking';

/**
 * Generate QR code data for a product
 * @param {string} productId - Product ID
 * @param {string} productName - Product name
 * @returns {string} QR code data
 */
export const generateProductQRData = (productId, productName) => {
  const deepLink = `https://qaafila.ca/product/${productId}`;
  return deepLink;
};

/**
 * Generate QR code data for checkout
 * @param {string} orderId - Order ID
 * @returns {string} QR code data
 */
export const generateCheckoutQRData = (orderId) => {
  const deepLink = `https://qaafila.ca/checkout/${orderId}`;
  return deepLink;
};

/**
 * Generate QR code data for referral
 * @param {string} userId - User ID
 * @param {string} referralCode - Referral code
 * @returns {string} QR code data
 */
export const generateReferralQRData = (userId, referralCode) => {
  const deepLink = `https://qaafila.ca/ref/${referralCode}?userId=${userId}`;
  return deepLink;
};

/**
 * Parse QR code data and redirect
 * @param {string} qrData - QR code data
 */
export const handleQRScan = async (qrData) => {
  try {
    if (qrData.startsWith('https://qaafila.ca/')) {
      await Linking.openURL(qrData);
    } else {
      console.log('QR Data:', qrData);
    }
  } catch (error) {
    console.error('Error handling QR scan:', error);
  }
};

/**
 * Create short URL for product
 * @param {string} productId - Product ID
 * @returns {string} Short URL
 */
export const createProductURL = (productId) => {
  return `https://qaafila.ca/p/${productId}`;
};

/**
 * Create short URL for collection
 * @param {string} collectionId - Collection ID
 * @returns {string} Short URL
 */
export const createCollectionURL = (collectionId) => {
  return `https://qaafila.ca/col/${collectionId}`;
};

/**
 * Create short URL for referral
 * @param {string} referralCode - Referral code
 * @returns {string} Short URL
 */
export const createReferralURL = (referralCode) => {
  return `https://qaafila.ca/ref/${referralCode}`;
};