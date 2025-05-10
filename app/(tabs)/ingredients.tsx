import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import { Search, Info, Check, X } from 'lucide-react-native';

// Mock ingredient data
const INGREDIENTS = [
  {
    id: 'hyaluronic-acid',
    name: 'Hyaluronic Acid',
    description: 'A powerful humectant that can hold up to 1000x its weight in water. Helps to hydrate and plump the skin.',
    benefits: ['Hydration', 'Plumping', 'Anti-aging'],
    safetyLevel: 'safe',
    imageUrl: 'https://images.pexels.com/photos/3621234/pexels-photo-3621234.jpeg?auto=compress&cs=tinysrgb&w=800',
    compatibility: {
      good: ['Vitamin C', 'Retinol', 'Niacinamide', 'Peptides'],
      avoid: []
    }
  },
  {
    id: 'niacinamide',
    name: 'Niacinamide',
    description: 'Vitamin B3 that helps to improve skin texture, reduce pore size, and balance oil production.',
    benefits: ['Brightening', 'Pore reduction', 'Oil control'],
    safetyLevel: 'safe',
    imageUrl: 'https://images.pexels.com/photos/6693662/pexels-photo-6693662.jpeg?auto=compress&cs=tinysrgb&w=800',
    compatibility: {
      good: ['Hyaluronic Acid', 'Peptides', 'Zinc'],
      avoid: ['Vitamin C (high concentration)']
    }
  },
  {
    id: 'centella-asiatica',
    name: 'Centella Asiatica',
    description: 'Also known as Gotu Kola, it's a medicinal herb that soothes irritation and promotes healing.',
    benefits: ['Soothing', 'Anti-inflammatory', 'Healing'],
    safetyLevel: 'safe',
    imageUrl: 'https://images.pexels.com/photos/7594336/pexels-photo-7594336.jpeg?auto=compress&cs=tinysrgb&w=800',
    compatibility: {
      good: ['Most ingredients'],
      avoid: []
    }
  },
  {
    id: 'retinol',
    name: 'Retinol',
    description: 'A vitamin A derivative that promotes cell turnover and stimulates collagen production.',
    benefits: ['Anti-aging', 'Acne treatment', 'Texture improvement'],
    safetyLevel: 'caution',
    imageUrl: 'https://images.pexels.com/photos/5795034/pexels-photo-5795034.jpeg?auto=compress&cs=tinysrgb&w=800',
    compatibility: {
      good: ['Hyaluronic Acid', 'Niacinamide', 'Peptides'],
      avoid: ['Vitamin C', 'AHAs/BHAs', 'Benzoyl Peroxide']
    }
  },
  {
    id: 'snail-mucin',
    name: 'Snail Mucin',
    description: 'A nutrient-rich extract that helps to repair damaged skin and improve hydration.',
    benefits: ['Healing', 'Hydration', 'Anti-aging'],
    safetyLevel: 'safe',
    imageUrl: 'https://images.pexels.com/photos/5938430/pexels-photo-5938430.jpeg?auto=compress&cs=tinysrgb&w=800',
    compatibility: {
      good: ['Most ingredients'],
      avoid: []
    }
  },
  {
    id: 'propolis',
    name: 'Propolis',
    description: 'A resinous mixture produced by bees with antibacterial and anti-inflammatory properties.',
    benefits: ['Soothing', 'Anti-bacterial', 'Healing'],
    safetyLevel: 'safe',
    imageUrl: 'https://images.pexels.com/photos/1249860/pexels-photo-1249860.jpeg?auto=compress&cs=tinysrgb&w=800',
    compatibility: {
      good: ['Most ingredients'],
      avoid: []
    }
  },
  {
    id: 'vitamin-c',
    name: 'Vitamin C',
    description: 'A powerful antioxidant that brightens skin, evens skin tone, and protects against UV damage.',
    benefits: ['Brightening', 'Antioxidant', 'Collagen production'],
    safetyLevel: 'caution',
    imageUrl: 'https://images.pexels.com/photos/3652170/pexels-photo-3652170.jpeg?auto=compress&cs=tinysrgb&w=800',
    compatibility: {
      good: ['Vitamin E', 'Ferulic Acid', 'Hyaluronic Acid'],
      avoid: ['Retinol', 'AHAs/BHAs', 'Niacinamide (high concentration)']
    }
  },
  {
    id: 'bakuchiol',
    name: 'Bakuchiol',
    description: 'A plant-based alternative to retinol that offers similar benefits without the irritation.',
    benefits: ['Anti-aging', 'Collagen production', 'Gentle'],
    safetyLevel: 'safe',
    imageUrl: 'https://images.pexels.com/photos/4958600/pexels-photo-4958600.jpeg?auto=compress&cs=tinysrgb&w=800',
    compatibility: {
      good: ['Most ingredients'],
      avoid: ['High concentration retinoids']
    }
  }
];

export default function IngredientsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
  const [myIngredients, setMyIngredients] = useState<string[]>([]);
  
  // Filter ingredients based on search query
  const filteredIngredients = INGREDIENTS.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Get selected ingredient details
  const selectedIngredientDetails = selectedIngredient 
    ? INGREDIENTS.find(ing => ing.id === selectedIngredient) 
    : null;
  
  // Toggle ingredient selection
  const handleSelectIngredient = (id: string) => {
    setSelectedIngredient(id);
  };
  
  // Toggle add/remove from My Ingredients list
  const toggleMyIngredient = (id: string) => {
    if (myIngredients.includes(id)) {
      setMyIngredients(prev => prev.filter(i => i !== id));
    } else {
      setMyIngredients(prev => [...prev, id]);
    }
  };
  
  // Render safety badge based on level
  const renderSafetyBadge = (level: string) => {
    switch (level) {
      case 'safe':
        return <Badge label="Safe for Most Skin Types" variant="tertiary" size="medium" />;
      case 'caution':
        return <Badge label="Use with Caution" variant="warning" size="medium" />;
      case 'avoid':
        return <Badge label="Potentially Irritating" variant="error" size="medium" />;
      default:
        return null;
    }
  };
  
  // Render ingredient card for search results
  const renderIngredientCard = ({ item }: { item: typeof INGREDIENTS[0] }) => (
    <TouchableOpacity
      style={[
        styles.ingredientCard, 
        selectedIngredient === item.id ? styles.selectedCard : null
      ]}
      onPress={() => handleSelectIngredient(item.id)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.benefitsContainer}>
          {item.benefits.slice(0, 2).map((benefit, index) => (
            <Badge
              key={index}
              label={benefit}
              variant="secondary"
              size="small"
              style={styles.benefitBadge}
            />
          ))}
          {item.benefits.length > 2 && (
            <Text style={styles.moreBenefits}>+{item.benefits.length - 2}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search ingredients..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearable
          containerStyle={styles.searchInput}
          leftIcon={<Search size={20} color={Colors.neutral.gray5} />}
        />
      </View>
      
      <View style={styles.contentContainer}>
        {/* Ingredient list */}
        <View style={styles.ingredientListContainer}>
          <Text style={styles.sectionTitle}>Popular Ingredients</Text>
          <FlatList
            data={filteredIngredients}
            keyExtractor={item => item.id}
            renderItem={renderIngredientCard}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
        
        {/* Ingredient details */}
        <ScrollView style={styles.detailsContainer} showsVerticalScrollIndicator={false}>
          {selectedIngredientDetails ? (
            <>
              <View style={styles.detailsHeader}>
                <Image
                  source={{ uri: selectedIngredientDetails.imageUrl }}
                  style={styles.detailsImage}
                />
                <View style={styles.headerOverlay}>
                  <Text style={styles.detailsTitle}>{selectedIngredientDetails.name}</Text>
                  <TouchableOpacity 
                    onPress={() => toggleMyIngredient(selectedIngredientDetails.id)}
                    style={[
                      styles.favoriteButton,
                      myIngredients.includes(selectedIngredientDetails.id) ? styles.favoriteButtonActive : null
                    ]}
                  >
                    {myIngredients.includes(selectedIngredientDetails.id) ? (
                      <Check size={16} color={Colors.neutral.white} />
                    ) : (
                      <Text style={styles.favoriteButtonText}>Add to My List</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              
              <Card style={styles.detailsCard}>
                <Text style={styles.detailsDescription}>
                  {selectedIngredientDetails.description}
                </Text>
                
                <View style={styles.detailsSection}>
                  <Text style={styles.detailsSectionTitle}>Benefits</Text>
                  <View style={styles.benefitsList}>
                    {selectedIngredientDetails.benefits.map((benefit, index) => (
                      <Badge
                        key={index}
                        label={benefit}
                        variant="secondary"
                        size="medium"
                        style={styles.detailBadge}
                      />
                    ))}
                  </View>
                </View>
                
                <View style={styles.detailsSection}>
                  <Text style={styles.detailsSectionTitle}>Safety</Text>
                  {renderSafetyBadge(selectedIngredientDetails.safetyLevel)}
                </View>
                
                <View style={styles.detailsSection}>
                  <Text style={styles.detailsSectionTitle}>Compatibility</Text>
                  
                  <View style={styles.compatibilitySection}>
                    <Text style={styles.compatibilityTitle}>Works Well With:</Text>
                    <View style={styles.compatibilityList}>
                      {selectedIngredientDetails.compatibility.good.map((item, index) => (
                        <View key={index} style={styles.compatibilityItem}>
                          <Check size={16} color={Colors.status.success} style={styles.compatibilityIcon} />
                          <Text style={styles.compatibilityText}>{item}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                  
                  {selectedIngredientDetails.compatibility.avoid.length > 0 && (
                    <View style={styles.compatibilitySection}>
                      <Text style={styles.compatibilityTitle}>Avoid Using With:</Text>
                      <View style={styles.compatibilityList}>
                        {selectedIngredientDetails.compatibility.avoid.map((item, index) => (
                          <View key={index} style={styles.compatibilityItem}>
                            <X size={16} color={Colors.status.error} style={styles.compatibilityIcon} />
                            <Text style={styles.compatibilityText}>{item}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}
                </View>
              </Card>
            </>
          ) : (
            <View style={styles.emptyStateContainer}>
              <Info size={48} color={Colors.neutral.gray4} />
              <Text style={styles.emptyStateTitle}>Ingredient Information</Text>
              <Text style={styles.emptyStateText}>
                Select an ingredient from the list to see detailed information about its benefits,
                safety, and compatibility with other ingredients.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
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
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  ingredientListContainer: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: Colors.neutral.gray2,
    backgroundColor: Colors.neutral.gray1,
  },
  sectionTitle: {
    ...Typography.subtitle1,
    padding: 16,
    paddingBottom: 8,
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
  ingredientCard: {
    flexDirection: 'row',
    backgroundColor: Colors.neutral.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: Colors.primary.pink,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardTitle: {
    ...Typography.subtitle2,
    marginBottom: 4,
  },
  cardDescription: {
    ...Typography.caption,
    color: Colors.neutral.gray6,
    marginBottom: 8,
  },
  benefitsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  benefitBadge: {
    marginRight: 8,
  },
  moreBenefits: {
    ...Typography.caption,
    color: Colors.neutral.gray5,
  },
  detailsContainer: {
    flex: 1.5,
    backgroundColor: Colors.neutral.gray1,
  },
  detailsHeader: {
    position: 'relative',
    width: '100%',
    height: 180,
  },
  detailsImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsTitle: {
    ...Typography.heading3,
    color: Colors.neutral.white,
  },
  favoriteButton: {
    backgroundColor: Colors.primary.pink,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteButtonActive: {
    backgroundColor: Colors.status.success,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  favoriteButtonText: {
    ...Typography.button,
    fontSize: 14,
    color: Colors.neutral.white,
  },
  detailsCard: {
    margin: 16,
  },
  detailsDescription: {
    ...Typography.body1,
    marginBottom: 16,
  },
  detailsSection: {
    marginBottom: 16,
  },
  detailsSectionTitle: {
    ...Typography.subtitle1,
    marginBottom: 8,
  },
  benefitsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailBadge: {
    marginRight: 8,
    marginBottom: 8,
  },
  compatibilitySection: {
    marginBottom: 12,
  },
  compatibilityTitle: {
    ...Typography.subtitle2,
    marginBottom: 8,
  },
  compatibilityList: {
    marginLeft: 4,
  },
  compatibilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  compatibilityIcon: {
    marginRight: 8,
  },
  compatibilityText: {
    ...Typography.body2,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyStateTitle: {
    ...Typography.heading3,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    ...Typography.body1,
    color: Colors.neutral.gray6,
    textAlign: 'center',
  },
});