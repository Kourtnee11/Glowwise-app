import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Platform,
  Image,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import { Camera as CameraIcon, Image as ImageIcon, Scan, X, RotateCcw, Info, ExternalLink } from 'lucide-react-native';

// Mock product data for scanner demo
const PRODUCT_DATA = {
  '123456789012': {
    name: 'Hydrating Toner',
    brand: 'COSRX',
    imageUrl: 'https://images.pexels.com/photos/5938277/pexels-photo-5938277.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'A gentle, hydrating toner that balances skin pH and prepares skin for the next steps in your routine.',
    ingredients: 'Water, Butylene Glycol, 1,2-Hexanediol, Betaine, Niacinamide, Sodium Hyaluronate, Panthenol, Allantoin',
    batchCode: 'A210421',
    expiryDate: '2024-04-21',
    price: '$18.50'
  },
  '234567890123': {
    name: 'Snail Mucin Essence',
    brand: 'MIZON',
    imageUrl: 'https://images.pexels.com/photos/5938537/pexels-photo-5938537.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Lightweight essence with 96% snail secretion filtrate to repair and hydrate damaged skin.',
    ingredients: 'Snail Secretion Filtrate, Sodium Hyaluronate, Butylene Glycol, Water, Glycerin, Trehalose',
    batchCode: 'B210315',
    expiryDate: '2023-03-15',
    price: '$19.99'
  }
};

export default function ScannerScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<string | null>(null);
  const [scanStep, setScanStep] = useState<'intro' | 'camera' | 'result'>('intro');
  const cameraRef = useRef<Camera>(null);
  
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  
  // Simulate scanning a product by returning a random product ID
  const handleScan = async () => {
    setScanning(true);
    
    // Simulate a delayed scan
    setTimeout(() => {
      // Just for demo purposes, randomly pick one of our mock products
      const productIds = Object.keys(PRODUCT_DATA);
      const randomProduct = productIds[Math.floor(Math.random() * productIds.length)];
      setScannedProduct(randomProduct);
      setScanning(false);
      setScanStep('result');
    }, 1500);
  };
  
  // Handle picking an image from gallery
  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled) {
      // Simulate scanning the image
      setScanning(true);
      setTimeout(() => {
        // Just for demo purposes, randomly pick one of our mock products
        const productIds = Object.keys(PRODUCT_DATA);
        const randomProduct = productIds[Math.floor(Math.random() * productIds.length)];
        setScannedProduct(randomProduct);
        setScanning(false);
        setScanStep('result');
      }, 1500);
    }
  };
  
  // Reset the scanner
  const handleReset = () => {
    setScannedProduct(null);
    setScanStep('intro');
  };
  
  // Add to wishlist (placeholder)
  const handleAddToWishlist = () => {
    // In a real app, this would add the product to the user's wishlist
    // For now, just reset the scanner
    handleReset();
  };
  
  // Shop for product (placeholder)
  const handleShopNow = () => {
    // In a real app, this would navigate to the shop
    // For now, just reset the scanner
    handleReset();
  };
  
  // Render the intro step with scan options
  const renderIntroStep = () => (
    <View style={styles.introContainer}>
      <Image
        source={{ uri: 'https://images.pexels.com/photos/5938613/pexels-photo-5938613.jpeg?auto=compress&cs=tinysrgb&w=800' }}
        style={styles.introImage}
      />
      
      <Text style={styles.introTitle}>Scan Your Product</Text>
      <Text style={styles.introText}>
        Scan the barcode or take a photo of your Korean skincare product to verify authenticity, 
        check ingredients, and find it in our shop.
      </Text>
      
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => setScanStep('camera')}
        >
          <View style={[styles.iconContainer, { backgroundColor: Colors.primary.pinkLight }]}>
            <CameraIcon size={32} color={Colors.primary.pinkDark} />
          </View>
          <Text style={styles.optionTitle}>Camera</Text>
          <Text style={styles.optionDescription}>
            Scan barcode or take photo of product
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.optionCard}
          onPress={handlePickImage}
        >
          <View style={[styles.iconContainer, { backgroundColor: Colors.secondary.lavenderLight }]}>
            <ImageIcon size={32} color={Colors.secondary.lavenderDark} />
          </View>
          <Text style={styles.optionTitle}>Gallery</Text>
          <Text style={styles.optionDescription}>
            Upload existing photo from gallery
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  // Render the camera view for scanning
  const renderCameraStep = () => {
    if (hasPermission === null) {
      return <View style={styles.container}><Text>Requesting camera permission...</Text></View>;
    }
    if (hasPermission === false) {
      return <View style={styles.container}><Text>No access to camera</Text></View>;
    }
    
    return (
      <View style={styles.cameraContainer}>
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={CameraType.back}
        >
          <View style={styles.scanOverlay}>
            <View style={styles.scanTarget} />
            {scanning && (
              <View style={styles.scanningLine} />
            )}
          </View>
          
          <View style={styles.cameraControls}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleReset}
            >
              <X size={24} color={Colors.neutral.white} />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.scanButton, scanning && styles.scanningButton]}
              onPress={handleScan}
              disabled={scanning}
            >
              <Scan size={32} color={Colors.neutral.white} />
            </TouchableOpacity>
            
            <View style={styles.placeholder} />
          </View>
        </Camera>
      </View>
    );
  };
  
  // Render the result view after scanning
  const renderResultStep = () => {
    if (!scannedProduct || !PRODUCT_DATA[scannedProduct]) return null;
    
    const product = PRODUCT_DATA[scannedProduct];
    
    return (
      <ScrollView style={styles.resultContainer} contentContainerStyle={styles.resultContent}>
        <Image
          source={{ uri: product.imageUrl }}
          style={styles.productImage}
        />
        
        <View style={styles.productInfo}>
          <Text style={styles.productBrand}>{product.brand}</Text>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>{product.price}</Text>
        </View>
        
        <Card style={styles.infoCard}>
          <View style={styles.cardHeader}>
            <Info size={20} color={Colors.primary.pinkDark} />
            <Text style={styles.cardTitle}>Product Information</Text>
          </View>
          
          <Text style={styles.productDescription}>{product.description}</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Batch Code:</Text>
            <Text style={styles.infoValue}>{product.batchCode}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Expiry Date:</Text>
            <Text style={styles.infoValue}>{product.expiryDate}</Text>
          </View>
          
          <View style={styles.infoSection}>
            <Text style={styles.infoSectionTitle}>Ingredients:</Text>
            <Text style={styles.ingredients}>{product.ingredients}</Text>
          </View>
        </Card>
        
        <View style={styles.actionButtons}>
          <Button
            title="Add to Wishlist"
            onPress={handleAddToWishlist}
            variant="outline"
            size="medium"
            style={styles.actionButton}
          />
          
          <Button
            title="Shop Now"
            onPress={handleShopNow}
            variant="primary"
            size="medium"
            style={styles.actionButton}
          />
        </View>
        
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <RotateCcw size={18} color={Colors.neutral.gray6} />
          <Text style={styles.resetText}>Scan Another Product</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };
  
  // Render the current step
  const renderCurrentStep = () => {
    switch (scanStep) {
      case 'intro':
        return renderIntroStep();
      case 'camera':
        return renderCameraStep();
      case 'result':
        return renderResultStep();
      default:
        return renderIntroStep();
    }
  };
  
  return (
    <View style={styles.container}>
      {renderCurrentStep()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.white,
  },
  introContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  introImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 24,
  },
  introTitle: {
    ...Typography.heading2,
    marginBottom: 16,
    textAlign: 'center',
  },
  introText: {
    ...Typography.body1,
    textAlign: 'center',
    color: Colors.neutral.gray6,
    marginBottom: 32,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  optionCard: {
    width: '48%',
    backgroundColor: Colors.neutral.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  optionTitle: {
    ...Typography.subtitle1,
    marginBottom: 8,
  },
  optionDescription: {
    ...Typography.caption,
    textAlign: 'center',
    color: Colors.neutral.gray6,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scanOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanTarget: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: Colors.neutral.white,
    borderRadius: 16,
    backgroundColor: 'transparent',
  },
  scanningLine: {
    position: 'absolute',
    width: 250,
    height: 2,
    backgroundColor: Colors.primary.pink,
    top: '50%',
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 48 : 24,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.primary.pinkDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanningButton: {
    opacity: 0.7,
  },
  placeholder: {
    width: 44,
  },
  resultContainer: {
    flex: 1,
    backgroundColor: Colors.neutral.gray1,
  },
  resultContent: {
    padding: 16,
    paddingBottom: 40,
  },
  productImage: {
    width: '100%',
    height: 250,
    borderRadius: 16,
    marginBottom: 16,
  },
  productInfo: {
    marginBottom: 16,
  },
  productBrand: {
    ...Typography.subtitle2,
    color: Colors.primary.pinkDark,
    marginBottom: 4,
  },
  productName: {
    ...Typography.heading3,
    marginBottom: 8,
  },
  productPrice: {
    ...Typography.subtitle1,
    color: Colors.accent.goldDark,
  },
  infoCard: {
    marginBottom: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    ...Typography.subtitle1,
    marginLeft: 8,
  },
  productDescription: {
    ...Typography.body1,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    ...Typography.subtitle2,
    width: 100,
  },
  infoValue: {
    ...Typography.body1,
    flex: 1,
  },
  infoSection: {
    marginTop: 16,
  },
  infoSectionTitle: {
    ...Typography.subtitle2,
    marginBottom: 8,
  },
  ingredients: {
    ...Typography.body2,
    lineHeight: 22,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  resetButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  resetText: {
    ...Typography.subtitle2,
    color: Colors.neutral.gray6,
    marginLeft: 8,
  },
});