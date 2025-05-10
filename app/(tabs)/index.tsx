import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'expo-router';
import { Heart, Beaker, ArrowRight, CalendarClock, ClipboardList, Camera } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.4;

export default function HomeScreen() {
  const router = useRouter();
  const { userProfile } = useAppContext();
  
  // Function to navigate to skin quiz if profile not completed
  const navigateToQuiz = () => {
    router.push('/quiz');
  };
  
  // Function to navigate to other screens
  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>
          Welcome to <Text style={styles.appName}>GlowWise</Text>
        </Text>
        <Text style={styles.subtitle}>
          Your personal skincare assistant for Korean beauty
        </Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsContainer}>
        <TouchableOpacity
          style={styles.quickAction}
          onPress={() => navigateTo('/quiz')}
        >
          <View style={[styles.iconContainer, { backgroundColor: Colors.primary.pinkLight }]}>
            <ClipboardList size={24} color={Colors.primary.pinkDark} />
          </View>
          <Text style={styles.quickActionText}>Skin Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickAction}
          onPress={() => navigateTo('/ingredients')}
        >
          <View style={[styles.iconContainer, { backgroundColor: Colors.secondary.lavenderLight }]}>
            <Beaker size={24} color={Colors.secondary.lavenderDark} />
          </View>
          <Text style={styles.quickActionText}>Ingredient Check</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickAction}
          onPress={() => navigateTo('/routines')}
        >
          <View style={[styles.iconContainer, { backgroundColor: Colors.tertiary.mintLight }]}>
            <CalendarClock size={24} color={Colors.tertiary.mintDark} />
          </View>
          <Text style={styles.quickActionText}>Routines</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickAction}
          onPress={() => navigateTo('/scanner')}
        >
          <View style={[styles.iconContainer, { backgroundColor: Colors.accent.goldLight }]}>
            <Camera size={24} color={Colors.accent.goldDark} />
          </View>
          <Text style={styles.quickActionText}>Scan Product</Text>
        </TouchableOpacity>
      </View>

      {/* Skin Profile Card or Quiz Prompt */}
      <Card style={styles.profileCard} elevation="small">
        {userProfile.completed ? (
          <View>
            <Text style={styles.cardTitle}>Your Skin Profile</Text>
            <View style={styles.profileDetails}>
              <View style={styles.profileItem}>
                <Text style={styles.profileLabel}>Skin Type:</Text>
                <Badge
                  label={userProfile.skinType || 'Unknown'}
                  variant="primary"
                  size="medium"
                />
              </View>
              
              <View style={styles.profileItem}>
                <Text style={styles.profileLabel}>Top Concerns:</Text>
                <View style={styles.concernsContainer}>
                  {userProfile.concerns?.map((concern, index) => (
                    <Badge
                      key={index}
                      label={concern}
                      variant="secondary"
                      size="medium"
                      style={styles.concernBadge}
                    />
                  ))}
                </View>
              </View>
              
              <Button
                title="Update Profile"
                onPress={navigateToQuiz}
                variant="outline"
                size="small"
                style={styles.updateButton}
              />
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.cardTitle}>Start Your Skincare Journey</Text>
            <Text style={styles.cardText}>
              Take our quick skin quiz to get personalized product recommendations for your unique skin needs.
            </Text>
            <Button
              title="Start Skin Quiz"
              onPress={navigateToQuiz}
              variant="primary"
              size="medium"
              style={styles.quizButton}
            />
          </View>
        )}
      </Card>

      {/* Trending Ingredients */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Ingredients</Text>
          <TouchableOpacity onPress={() => navigateTo('/ingredients')}>
            <View style={styles.viewMoreContainer}>
              <Text style={styles.viewMoreText}>View All</Text>
              <ArrowRight size={16} color={Colors.primary.pinkDark} />
            </View>
          </TouchableOpacity>
        </View>
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollContent}
        >
          {/* Ingredient Cards */}
          <Card style={styles.ingredientCard}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/3621234/pexels-photo-3621234.jpeg?auto=compress&cs=tinysrgb&w=800' }}
              style={styles.ingredientImage}
            />
            <View style={styles.ingredientContent}>
              <Text style={styles.ingredientName}>Hyaluronic Acid</Text>
              <Text style={styles.ingredientDescription}>Deep hydration</Text>
              <Badge label="Hydrating" variant="tertiary" size="small" />
            </View>
          </Card>
          
          <Card style={styles.ingredientCard}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/6693662/pexels-photo-6693662.jpeg?auto=compress&cs=tinysrgb&w=800' }}
              style={styles.ingredientImage}
            />
            <View style={styles.ingredientContent}>
              <Text style={styles.ingredientName}>Niacinamide</Text>
              <Text style={styles.ingredientDescription}>Reduces pores</Text>
              <Badge label="Brightening" variant="primary" size="small" />
            </View>
          </Card>
          
          <Card style={styles.ingredientCard}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/7594336/pexels-photo-7594336.jpeg?auto=compress&cs=tinysrgb&w=800' }}
              style={styles.ingredientImage}
            />
            <View style={styles.ingredientContent}>
              <Text style={styles.ingredientName}>Centella Asiatica</Text>
              <Text style={styles.ingredientDescription}>Calming</Text>
              <Badge label="Soothing" variant="secondary" size="small" />
            </View>
          </Card>
        </ScrollView>
      </View>

      {/* Featured Products */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <TouchableOpacity onPress={() => navigateTo('/shop')}>
            <View style={styles.viewMoreContainer}>
              <Text style={styles.viewMoreText}>View All</Text>
              <ArrowRight size={16} color={Colors.primary.pinkDark} />
            </View>
          </TouchableOpacity>
        </View>
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollContent}
        >
          {/* Product Cards */}
          <Card style={styles.productCard}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/5069609/pexels-photo-5069609.jpeg?auto=compress&cs=tinysrgb&w=800' }}
              style={styles.productImage}
            />
            <View style={styles.productContent}>
              <Text style={styles.productName}>Gentle Cleansing Foam</Text>
              <Text style={styles.productBrand}>COSRX</Text>
              <View style={styles.productFooter}>
                <Text style={styles.productPrice}>$12.99</Text>
                <TouchableOpacity style={styles.favoriteButton}>
                  <Heart size={18} color={Colors.neutral.gray5} />
                </TouchableOpacity>
              </View>
            </View>
          </Card>
          
          <Card style={styles.productCard}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/5938277/pexels-photo-5938277.jpeg?auto=compress&cs=tinysrgb&w=800' }}
              style={styles.productImage}
            />
            <View style={styles.productContent}>
              <Text style={styles.productName}>Hydrating Toner</Text>
              <Text style={styles.productBrand}>Klairs</Text>
              <View style={styles.productFooter}>
                <Text style={styles.productPrice}>$18.50</Text>
                <TouchableOpacity style={styles.favoriteButton}>
                  <Heart size={18} color={Colors.neutral.gray5} />
                </TouchableOpacity>
              </View>
            </View>
          </Card>
          
          <Card style={styles.productCard}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/5938537/pexels-photo-5938537.jpeg?auto=compress&cs=tinysrgb&w=800' }}
              style={styles.productImage}
            />
            <View style={styles.productContent}>
              <Text style={styles.productName}>Snail Essence</Text>
              <Text style={styles.productBrand}>Missha</Text>
              <View style={styles.productFooter}>
                <Text style={styles.productPrice}>$24.00</Text>
                <TouchableOpacity style={styles.favoriteButton}>
                  <Heart size={18} color={Colors.neutral.gray5} />
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        </ScrollView>
      </View>

      {/* Ask our Expert */}
      <Card style={styles.assistantCard} elevation="small">
        <View style={styles.assistantContent}>
          <Text style={styles.assistantTitle}>Need Skincare Advice?</Text>
          <Text style={styles.assistantText}>
            Our AI assistant can help you build a routine, check product compatibility, or answer skincare questions.
          </Text>
          <Button
            title="Chat with Assistant"
            onPress={() => navigateTo('/assistant')}
            variant="tertiary"
            size="medium"
            style={styles.assistantButton}
          />
        </View>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/8130464/pexels-photo-8130464.jpeg?auto=compress&cs=tinysrgb&w=800' }}
          style={styles.assistantImage}
        />
      </Card>
      
      {/* Bottom Spacing */}
      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.gray1,
  },
  welcomeSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  welcomeText: {
    ...Typography.heading2,
  },
  appName: {
    color: Colors.primary.pinkDark,
  },
  subtitle: {
    ...Typography.body1,
    color: Colors.neutral.gray6,
    marginTop: 4,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  quickAction: {
    alignItems: 'center',
    width: '22%',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  quickActionText: {
    ...Typography.caption,
    textAlign: 'center',
    marginTop: 4,
  },
  profileCard: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  cardTitle: {
    ...Typography.heading3,
    marginBottom: 12,
  },
  cardText: {
    ...Typography.body2,
    color: Colors.neutral.gray6,
    marginBottom: 16,
  },
  quizButton: {
    alignSelf: 'flex-start',
  },
  profileDetails: {
    gap: 12,
  },
  profileItem: {
    marginBottom: 8,
  },
  profileLabel: {
    ...Typography.subtitle2,
    marginBottom: 4,
  },
  concernsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  concernBadge: {
    marginRight: 8,
    marginBottom: 8,
  },
  updateButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  sectionContainer: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    ...Typography.heading3,
  },
  viewMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewMoreText: {
    ...Typography.subtitle2,
    color: Colors.primary.pinkDark,
    marginRight: 4,
  },
  horizontalScrollContent: {
    paddingRight: 16,
  },
  ingredientCard: {
    width: cardWidth,
    marginRight: 16,
    padding: 0,
    overflow: 'hidden',
  },
  ingredientImage: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  ingredientContent: {
    padding: 12,
  },
  ingredientName: {
    ...Typography.subtitle2,
    marginBottom: 4,
  },
  ingredientDescription: {
    ...Typography.caption,
    color: Colors.neutral.gray6,
    marginBottom: 8,
  },
  productCard: {
    width: cardWidth,
    marginRight: 16,
    padding: 0,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 130,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  productContent: {
    padding: 12,
  },
  productName: {
    ...Typography.subtitle2,
    marginBottom: 4,
  },
  productBrand: {
    ...Typography.caption,
    color: Colors.neutral.gray6,
    marginBottom: 8,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    ...Typography.subtitle2,
    color: Colors.primary.pinkDark,
  },
  favoriteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.neutral.gray1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  assistantCard: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 24,
    flexDirection: 'row',
    overflow: 'hidden',
    paddingRight: 0,
  },
  assistantContent: {
    flex: 2,
    paddingRight: 12,
  },
  assistantTitle: {
    ...Typography.heading4,
    marginBottom: 8,
  },
  assistantText: {
    ...Typography.body2,
    color: Colors.neutral.gray6,
    marginBottom: 16,
  },
  assistantButton: {
    alignSelf: 'flex-start',
  },
  assistantImage: {
    flex: 1,
    height: '100%',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  bottomPadding: {
    height: 32,
  },
});