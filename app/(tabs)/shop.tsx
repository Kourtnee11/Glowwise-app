import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import { useAppContext } from '@/context/AppContext';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import { Search, Filter, Heart, ShoppingBag, Star, X } from 'lucide-react-native';

// Mock product data
const PRODUCTS = [
  {
    id: 'p1',
    name: 'Gentle Cleansing Foam',
    brand: 'COSRX',
    imageUrl: 'https://images.pexels.com/photos/5069609/pexels-photo-5069609.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 12.99,
    rating: 4.5,
    category: 'cleanser',
    bestseller: true,
    skinTypes: ['All Skin Types', 'Sensitive'],
    description: 'A gentle, low pH cleanser that effectively removes impurities without stripping skin of moisture.',
    ingredients: 'Water, Glycerin, Coco-Betaine, Lauramidopropyl Betaine, PEG-7 Glyceryl Cocoate, Hyaluronic Acid',
  },
  {
    id: 'p2',
    name: 'Hydrating Toner',
    brand: 'Klairs',
    imageUrl: 'https://images.pexels.com/photos/5938277/pexels-photo-5938277.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 18.50,
    rating: 4.8,
    category: 'toner',
    bestseller: false,
    skinTypes: ['Dry', 'Normal', 'Combination'],
    description: 'A hydrating, alcohol-free toner that balances skin pH and preps skin for the rest of your routine.',
    ingredients: 'Water, Butylene Glycol, Dimethyl Sulfone, Betaine, Caprylic/Capric Triglyceride, Natto Gum',
  },
  {
    id: 'p3',
    name: 'Snail Mucin Essence',
    brand: 'Mizon',
    imageUrl: 'https://images.pexels.com/photos/5938537/pexels-photo-5938537.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 24.00,
    rating: 4.7,
    category: 'essence',
    bestseller: true,
    skinTypes: ['All Skin Types', 'Sensitive', 'Acne-Prone'],
    description: 'An essence with 96% snail secretion filtrate to repair damaged skin, boost hydration, and soothe irritation.',
    ingredients: 'Snail Secretion Filtrate, Sodium Hyaluronate, Butylene Glycol, Water, Glycerin, Trehalose',
  },
  {
    id: 'p4',
    name: 'Vitamin C Serum',
    brand: 'Some By Mi',
    imageUrl: 'https://images.pexels.com/photos/3652170/pexels-photo-3652170.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 29.99,
    rating: 4.3,
    category: 'serum',
    bestseller: false,
    skinTypes: ['Normal', 'Oily', 'Combination'],
    description: 'A powerful antioxidant serum with 20% vitamin C to brighten skin, reduce hyperpigmentation, and protect against environmental damage.',
    ingredients: 'Water, Ascorbic Acid, Sodium Hyaluronate, Butylene Glycol, Niacinamide, Adenosine',
  },
  {
    id: 'p5',
    name: 'Centella Ampoule',
    brand: 'Purito',
    imageUrl: 'https://images.pexels.com/photos/7594336/pexels-photo-7594336.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 21.99,
    rating: 4.6,
    category: 'ampoule',
    bestseller: false,
    skinTypes: ['Sensitive', 'Acne-Prone', 'All Skin Types'],
    description: 'A soothing ampoule with centella asiatica extract to calm irritated skin, reduce redness, and support skin barrier.',
    ingredients: 'Centella Asiatica Extract, Glycerin, Butylene Glycol, Pentylene Glycol, 1,2-Hexanediol',
  },
  {
    id: 'p6',
    name: 'Hyaluronic Acid Moisturizer',
    brand: 'Laneige',
    imageUrl: 'https://images.pexels.com/photos/3621234/pexels-photo-3621234.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 35.00,
    rating: 4.9,
    category: 'moisturizer',
    bestseller: true,
    skinTypes: ['Dry', 'Normal', 'Dehydrated'],
    description: 'A hydrating moisturizer with multiple forms of hyaluronic acid to deeply hydrate and plump skin.',
    ingredients: 'Water, Glycerin, Sodium Hyaluronate, Butylene Glycol, Dimethicone, Cyclopentasiloxane',
  },
  {
    id: 'p7',
    name: 'SPF 50 Sunscreen',
    brand: 'Missha',
    imageUrl: 'https://images.pexels.com/photos/5462207/pexels-photo-5462207.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 19.99,
    rating: 4.4,
    category: 'sunscreen',
    bestseller: false,
    skinTypes: ['All Skin Types'],
    description: 'A lightweight, non-greasy sunscreen with SPF 50+ PA++++ to protect against UVA and UVB rays.',
    ingredients: 'Water, Ethylhexyl Methoxycinnamate, Homosalate, Ethylhexyl Salicylate, Butylene Glycol',
  },
  {
    id: 'p8',
    name: 'Overnight Sleeping Mask',
    brand: 'Innisfree',
    imageUrl: 'https://images.pexels.com/photos/5240367/pexels-photo-5240367.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 27.50,
    rating: 4.7,
    category: 'mask',
    bestseller: false,
    skinTypes: ['All Skin Types', 'Dry'],
    description: 'A nourishing overnight mask that works while you sleep to hydrate, repair, and rejuvenate skin.',
    ingredients: 'Water, Propanediol, Glycerin, Squalane, Beta-Glucan, Trehalose, Honey Extract',
  }
];

// Product categories
const CATEGORIES = [
  { id: 'all', name: 'All Products' },
  { id: 'cleanser', name: 'Cleansers' },
  { id: 'toner', name: 'Toners' },
  { id: 'essence', name: 'Essences' },
  { id: 'serum', name: 'Serums' },
  { id: 'ampoule', name: 'Ampoules' },
  { id: 'moisturizer', name: 'Moisturizers' },
  { id: 'sunscreen', name: 'Sunscreens' },
  { id: 'mask', name: 'Masks' }
];

export default function ShopScreen() {
  const { wishlist, addToWishlist, removeFromWishlist } = useAppContext();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  
  // Filter products based on search query and category
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Get selected product details
  const selectedProductDetails = selectedProduct 
    ? PRODUCTS.find(p => p.id === selectedProduct) 
    : null;
  
  // Check if a product is in wishlist
  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };
  
  // Toggle wishlist status
  const toggleWishlist = (product: typeof PRODUCTS[0]) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        addedDate: new Date().toISOString()
      });
    }
  };
  
  // Handle selecting a product
  const handleSelectProduct = (productId: string) => {
    setSelectedProduct(productId);
  };
  
  // Close product details
  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };
  
  // Render stars for rating
  const renderRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          size={16}
          color={Colors.accent.gold}
          fill={Colors.accent.gold}
        />
      );
    }
    
    if (halfStar) {
      stars.push(
        <Star
          key="half"
          size={16}
          color={Colors.accent.gold}
          fill="none"
        />
      );
    }
    
    return (
      <View style={styles.ratingContainer}>
        <View style={styles.stars}>{stars}</View>
        <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
      </View>
    );
  };
  
  // Render product card
  const renderProductCard = ({ item }: { item: typeof PRODUCTS[0] }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => handleSelectProduct(item.id)}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: item.imageUrl }} 
          style={styles.productImage} 
        />
        {item.bestseller && (
          <Badge 
            label="Best Seller" 
            variant="primary" 
            size="small" 
            style={styles.bestsellerBadge} 
          />
        )}
        <TouchableOpacity
          style={[
            styles.wishlistButton,
            isInWishlist(item.id) ? styles.wishlistButtonActive : null
          ]}
          onPress={() => toggleWishlist(item)}
        >
          <Heart
            size={18}
            color={isInWishlist(item.id) ? Colors.neutral.white : Colors.neutral.gray6}
            fill={isInWishlist(item.id) ? Colors.primary.pink : 'none'}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.productContent}>
        <Text style={styles.brandName}>{item.brand}</Text>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        {renderRatingStars(item.rating)}
      </View>
    </TouchableOpacity>
  );
  
  // Render category pill
  const renderCategoryPill = (category: typeof CATEGORIES[0]) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryPill,
        selectedCategory === category.id ? styles.selectedCategoryPill : null
      ]}
      onPress={() => setSelectedCategory(category.id)}
    >
      <Text 
        style={[
          styles.categoryText,
          selectedCategory === category.id ? styles.selectedCategoryText : null
        ]}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
  
  // Render product details modal
  const renderProductDetails = () => {
    if (!selectedProductDetails) return null;
    
    return (
      <View style={styles.detailsContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={handleCloseDetails}
          >
            <X size={24} color={Colors.neutral.white} />
          </TouchableOpacity>
          
          <Image
            source={{ uri: selectedProductDetails.imageUrl }}
            style={styles.detailsImage}
          />
          
          <View style={styles.detailsContent}>
            <Text style={styles.detailsBrand}>{selectedProductDetails.brand}</Text>
            <Text style={styles.detailsName}>{selectedProductDetails.name}</Text>
            <Text style={styles.detailsPrice}>${selectedProductDetails.price.toFixed(2)}</Text>
            
            {renderRatingStars(selectedProductDetails.rating)}
            
            <View style={styles.skinTypesContainer}>
              {selectedProductDetails.skinTypes.map((type, index) => (
                <Badge
                  key={index}
                  label={type}
                  variant="secondary"
                  size="medium"
                  style={styles.skinTypeBadge}
                />
              ))}
            </View>
            
            <View style={styles.descriptionContainer}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.descriptionText}>
                {selectedProductDetails.description}
              </Text>
            </View>
            
            <View style={styles.ingredientsContainer}>
              <Text style={styles.sectionTitle}>Ingredients</Text>
              <Text style={styles.ingredientsText}>
                {selectedProductDetails.ingredients}
              </Text>
            </View>
            
            <View style={styles.actionsContainer}>
              <Button
                title={isInWishlist(selectedProductDetails.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                onPress={() => toggleWishlist(selectedProductDetails)}
                variant={isInWishlist(selectedProductDetails.id) ? "outline" : "secondary"}
                size="medium"
                style={styles.wishlistAction}
                textStyle={{ color: isInWishlist(selectedProductDetails.id) ? Colors.primary.pinkDark : undefined }}
                leftIcon={
                  <Heart
                    size={18}
                    color={isInWishlist(selectedProductDetails.id) ? Colors.primary.pinkDark : Colors.neutral.gray7}
                    fill={isInWishlist(selectedProductDetails.id) ? Colors.primary.pinkDark : 'none'}
                  />
                }
              />
              
              <Button
                title="Add to Cart"
                onPress={() => {}}
                variant="primary"
                size="medium"
                style={styles.cartAction}
                leftIcon={<ShoppingBag size={18} color={Colors.neutral.white} />}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      {/* Search and filters */}
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearable
          containerStyle={styles.searchInput}
          leftIcon={<Search size={20} color={Colors.neutral.gray5} />}
        />
      </View>
      
      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {CATEGORIES.map(renderCategoryPill)}
      </ScrollView>
      
      {/* Products grid */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProductCard}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.productsGrid}
        columnWrapperStyle={styles.productRow}
        showsVerticalScrollIndicator={false}
      />
      
      {/* Product details modal */}
      {selectedProduct && renderProductDetails()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.white,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: Colors.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray2,
  },
  searchInput: {
    marginBottom: 0,
  },
  categoriesContainer: {
    padding: 16,
    paddingTop: 8,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.neutral.gray2,
    marginRight: 8,
  },
  selectedCategoryPill: {
    backgroundColor: Colors.primary.pink,
  },
  categoryText: {
    ...Typography.subtitle2,
    color: Colors.neutral.gray7,
  },
  selectedCategoryText: {
    color: Colors.neutral.white,
  },
  productsGrid: {
    padding: 8,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: Colors.neutral.white,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 150,
  },
  bestsellerBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.neutral.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  wishlistButtonActive: {
    backgroundColor: Colors.primary.pink,
  },
  productContent: {
    padding: 12,
  },
  brandName: {
    ...Typography.caption,
    color: Colors.neutral.gray6,
    marginBottom: 4,
  },
  productName: {
    ...Typography.subtitle2,
    height: 44,
    marginBottom: 4,
  },
  productPrice: {
    ...Typography.subtitle1,
    color: Colors.primary.pinkDark,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
    marginRight: 4,
  },
  ratingText: {
    ...Typography.caption,
    color: Colors.neutral.gray6,
  },
  detailsContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.neutral.white,
    zIndex: 999,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  detailsImage: {
    width: '100%',
    height: 300,
  },
  detailsContent: {
    padding: 16,
  },
  detailsBrand: {
    ...Typography.subtitle2,
    color: Colors.neutral.gray6,
    marginBottom: 4,
  },
  detailsName: {
    ...Typography.heading3,
    marginBottom: 8,
  },
  detailsPrice: {
    ...Typography.heading4,
    color: Colors.primary.pinkDark,
    marginBottom: 12,
  },
  skinTypesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    marginBottom: 24,
  },
  skinTypeBadge: {
    marginRight: 8,
    marginBottom: 8,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...Typography.subtitle1,
    marginBottom: 8,
  },
  descriptionText: {
    ...Typography.body1,
    color: Colors.neutral.gray7,
    lineHeight: 24,
  },
  ingredientsContainer: {
    marginBottom: 24,
  },
  ingredientsText: {
    ...Typography.body2,
    color: Colors.neutral.gray6,
    lineHeight: 22,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 32,
  },
  wishlistAction: {
    flex: 1,
    marginRight: 8,
  },
  cartAction: {
    flex: 1,
    marginLeft: 8,
  },
});