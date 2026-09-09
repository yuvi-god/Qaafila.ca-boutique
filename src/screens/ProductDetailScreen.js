import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Share } from 'react-native';
import FastImage from 'react-native-fast-image';
import QRCode from 'react-native-qrcode-svg';
import { useCartStore } from '../store/cartStore';
import { generateProductQRData, createProductURL } from '../utils/qrUtils';

export const ProductDetailScreen = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const addToCart = useCartStore((state) => state.addToCart);

  const qrData = generateProductQRData(productId, product?.name);
  const productURL = createProductURL(productId);

  const handleShareProduct = async () => {
    try {
      await Share.share({
        message: `Check out this product: ${productURL}`,
        url: productURL,
        title: product?.name,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <FastImage
        source={{ uri: product?.image }}
        style={styles.image}
        resizeMode={FastImage.resizeMode.cover}
        cache={FastImage.cacheControl.immutable}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{product?.name}</Text>
        <Text style={styles.price}>${product?.price}</Text>
        <Text style={styles.description}>{product?.description}</Text>

        <View style={styles.qrSection}>
          <Text style={styles.qrLabel}>Share QR Code</Text>
          <View style={styles.qrContainer}>
            <QRCode value={qrData} size={200} />
          </View>
        </View>

        <View style={styles.urlSection}>
          <Text style={styles.urlLabel}>Product URL</Text>
          <Text style={styles.url} selectable>{productURL}</Text>
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={handleAddToCart}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.shareButton]}
          onPress={handleShareProduct}
        >
          <Text style={styles.buttonText}>Share Product</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: '#FF6B6B',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  qrSection: {
    alignItems: 'center',
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  qrLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  qrContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  urlSection: {
    marginVertical: 15,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  urlLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  url: {
    fontSize: 12,
    color: '#007AFF',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  button: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  shareButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});