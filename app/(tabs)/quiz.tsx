import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Define quiz questions and options
const SKIN_TYPES = [
  { id: 'dry', label: 'Dry', description: 'Feels tight, flaky patches' },
  { id: 'oily', label: 'Oily', description: 'Shiny, especially T-zone' },
  { id: 'combination', label: 'Combination', description: 'Oily T-zone, dry cheeks' },
  { id: 'normal', label: 'Normal', description: 'Balanced, not too dry or oily' },
  { id: 'sensitive', label: 'Sensitive', description: 'Reacts easily, prone to redness' }
];

const SKIN_CONCERNS = [
  { id: 'acne', label: 'Acne', description: 'Breakouts, blemishes' },
  { id: 'aging', label: 'Aging', description: 'Fine lines, wrinkles' },
  { id: 'hyperpigmentation', label: 'Hyperpigmentation', description: 'Dark spots, uneven tone' },
  { id: 'redness', label: 'Redness', description: 'Rosacea, irritation' },
  { id: 'dehydration', label: 'Dehydration', description: 'Lacks water, not oil' },
  { id: 'dullness', label: 'Dullness', description: 'Lacks radiance, uneven texture' },
  { id: 'pores', label: 'Large Pores', description: 'Visible, enlarged pores' },
  { id: 'blackheads', label: 'Blackheads', description: 'Clogged pores, especially on nose' }
];

const SENSITIVITY_LEVELS = [
  { id: 'not-sensitive', label: 'Not Sensitive', description: 'Can use most products without issues' },
  { id: 'slightly-sensitive', label: 'Slightly Sensitive', description: 'Occasional reactions to strong actives' },
  { id: 'moderately-sensitive', label: 'Moderately Sensitive', description: 'Regular reactions to many products' },
  { id: 'very-sensitive', label: 'Very Sensitive', description: 'Reacts easily to most products' }
];

export default function SkinQuizScreen() {
  const router = useRouter();
  const { userProfile, updateUserProfile } = useAppContext();
  
  // Quiz state
  const [step, setStep] = useState(1); // 1: Welcome, 2: Skin Type, 3: Concerns, 4: Sensitivity, 5: Results
  const [selectedSkinType, setSelectedSkinType] = useState<string | null>(userProfile.skinType || null);
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>(userProfile.concerns || []);
  const [selectedSensitivity, setSelectedSensitivity] = useState<string | null>(userProfile.sensitivity || null);
  
  // Handle skin type selection
  const handleSkinTypeSelect = (typeId: string) => {
    setSelectedSkinType(typeId);
  };
  
  // Handle concern toggle
  const handleConcernToggle = (concernId: string) => {
    if (selectedConcerns.includes(concernId)) {
      setSelectedConcerns(prev => prev.filter(id => id !== concernId));
    } else {
      setSelectedConcerns(prev => [...prev, concernId]);
    }
  };
  
  // Handle sensitivity selection
  const handleSensitivitySelect = (sensitivityId: string) => {
    setSelectedSensitivity(sensitivityId);
  };
  
  // Navigate to next step
  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };
  
  // Navigate to previous step
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  // Complete quiz and save results
  const handleComplete = () => {
    // Get the label strings for each selected option
    const concernLabels = selectedConcerns.map(
      id => SKIN_CONCERNS.find(concern => concern.id === id)?.label || ''
    ).filter(label => label !== '');
    
    // Save to context
    updateUserProfile({
      skinType: selectedSkinType ? 
        SKIN_TYPES.find(type => type.id === selectedSkinType)?.label || '' : '',
      concerns: concernLabels,
      sensitivity: selectedSensitivity ? 
        SENSITIVITY_LEVELS.find(level => level.id === selectedSensitivity)?.label || '' : '',
      completed: true
    });
    
    // Navigate to results or home
    router.push('/');
  };
  
  // Determine if next button should be disabled
  const isNextDisabled = () => {
    switch (step) {
      case 2: return !selectedSkinType;
      case 3: return selectedConcerns.length === 0;
      case 4: return !selectedSensitivity;
      default: return false;
    }
  };
  
  // Render welcome step
  const renderWelcome = () => (
    <View style={styles.stepContainer}>
      <Image
        source={{ uri: 'https://images.pexels.com/photos/3762453/pexels-photo-3762453.jpeg?auto=compress&cs=tinysrgb&w=800' }}
        style={styles.welcomeImage}
      />
      <View style={styles.welcomeContent}>
        <Text style={styles.welcomeTitle}>Discover Your Perfect Skincare Routine</Text>
        <Text style={styles.welcomeText}>
          Our personalized skin quiz will help identify your skin type, concerns, and the best products
          for your unique needs.
        </Text>
        <Button
          title="Start Quiz"
          onPress={handleNext}
          variant="primary"
          size="large"
          style={styles.welcomeButton}
          fullWidth
        />
      </View>
    </View>
  );
  
  // Render skin type selection step
  const renderSkinTypeStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>What's your skin type?</Text>
      <Text style={styles.stepDescription}>
        Select the option that best describes your skin most of the time.
      </Text>
      
      <ScrollView style={styles.optionsScrollView}>
        {SKIN_TYPES.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.optionCard,
              selectedSkinType === type.id && styles.selectedOptionCard
            ]}
            onPress={() => handleSkinTypeSelect(type.id)}
          >
            <View style={styles.optionContent}>
              <Text style={styles.optionLabel}>{type.label}</Text>
              <Text style={styles.optionDescription}>{type.description}</Text>
            </View>
            
            {selectedSkinType === type.id && (
              <View style={styles.checkIcon}>
                <Check size={18} color={Colors.primary.pinkDark} />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.navigationButtons}>
        <Button
          title="Back"
          onPress={handleBack}
          variant="outline"
          size="medium"
          style={styles.backButton}
        />
        <Button
          title="Next"
          onPress={handleNext}
          variant="primary"
          size="medium"
          disabled={isNextDisabled()}
        />
      </View>
    </View>
  );
  
  // Render skin concerns step
  const renderConcernsStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>What are your skin concerns?</Text>
      <Text style={styles.stepDescription}>
        Select all that apply to your skin.
      </Text>
      
      <ScrollView style={styles.optionsScrollView}>
        <View style={styles.concernsGrid}>
          {SKIN_CONCERNS.map((concern) => (
            <TouchableOpacity
              key={concern.id}
              style={[
                styles.concernCard,
                selectedConcerns.includes(concern.id) && styles.selectedConcernCard
              ]}
              onPress={() => handleConcernToggle(concern.id)}
            >
              <Text style={styles.concernLabel}>{concern.label}</Text>
              <Text style={styles.concernDescription}>{concern.description}</Text>
              
              {selectedConcerns.includes(concern.id) && (
                <View style={styles.concernCheckmark}>
                  <Check size={14} color={Colors.neutral.white} />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      
      <View style={styles.navigationButtons}>
        <Button
          title="Back"
          onPress={handleBack}
          variant="outline"
          size="medium"
          style={styles.backButton}
        />
        <Button
          title="Next"
          onPress={handleNext}
          variant="primary"
          size="medium"
          disabled={isNextDisabled()}
        />
      </View>
    </View>
  );
  
  // Render sensitivity step
  const renderSensitivityStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>How sensitive is your skin?</Text>
      <Text style={styles.stepDescription}>
        Select the option that best describes your skin's reaction to products.
      </Text>
      
      <ScrollView style={styles.optionsScrollView}>
        {SENSITIVITY_LEVELS.map((level) => (
          <TouchableOpacity
            key={level.id}
            style={[
              styles.optionCard,
              selectedSensitivity === level.id && styles.selectedOptionCard
            ]}
            onPress={() => handleSensitivitySelect(level.id)}
          >
            <View style={styles.optionContent}>
              <Text style={styles.optionLabel}>{level.label}</Text>
              <Text style={styles.optionDescription}>{level.description}</Text>
            </View>
            
            {selectedSensitivity === level.id && (
              <View style={styles.checkIcon}>
                <Check size={18} color={Colors.primary.pinkDark} />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.navigationButtons}>
        <Button
          title="Back"
          onPress={handleBack}
          variant="outline"
          size="medium"
          style={styles.backButton}
        />
        <Button
          title="Complete"
          onPress={handleComplete}
          variant="primary"
          size="medium"
          disabled={isNextDisabled()}
        />
      </View>
    </View>
  );
  
  // Render current step
  const renderStep = () => {
    switch (step) {
      case 1: return renderWelcome();
      case 2: return renderSkinTypeStep();
      case 3: return renderConcernsStep();
      case 4: return renderSensitivityStep();
      default: return renderWelcome();
    }
  };
  
  return (
    <View style={styles.container}>
      {/* Progress bar */}
      {step > 1 && (
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((step - 1) / 3) * 100}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            Step {step - 1} of 3
          </Text>
        </View>
      )}
      
      {/* Step content */}
      {renderStep()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.white,
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  progressTrack: {
    height: 8,
    backgroundColor: Colors.neutral.gray2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary.pink,
    borderRadius: 4,
  },
  progressText: {
    ...Typography.caption,
    textAlign: 'right',
    marginTop: 4,
  },
  stepContainer: {
    flex: 1,
    padding: 16,
  },
  welcomeImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 24,
  },
  welcomeContent: {
    alignItems: 'center',
  },
  welcomeTitle: {
    ...Typography.heading2,
    textAlign: 'center',
    marginBottom: 16,
  },
  welcomeText: {
    ...Typography.body1,
    textAlign: 'center',
    marginBottom: 32,
  },
  welcomeButton: {
    marginTop: 16,
  },
  stepTitle: {
    ...Typography.heading3,
    marginBottom: 8,
  },
  stepDescription: {
    ...Typography.body1,
    color: Colors.neutral.gray6,
    marginBottom: 24,
  },
  optionsScrollView: {
    flex: 1,
    marginBottom: 16,
  },
  optionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.neutral.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.gray3,
    marginBottom: 12,
  },
  selectedOptionCard: {
    borderColor: Colors.primary.pink,
    backgroundColor: Colors.primary.pinkLight,
  },
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    ...Typography.subtitle1,
    marginBottom: 4,
  },
  optionDescription: {
    ...Typography.body2,
    color: Colors.neutral.gray6,
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary.pinkLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    minWidth: 100,
  },
  concernsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  concernCard: {
    width: '48%',
    padding: 12,
    backgroundColor: Colors.neutral.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.gray3,
    marginBottom: 12,
    position: 'relative',
  },
  selectedConcernCard: {
    borderColor: Colors.primary.pink,
    backgroundColor: Colors.primary.pinkLight,
  },
  concernLabel: {
    ...Typography.subtitle2,
    marginBottom: 4,
  },
  concernDescription: {
    ...Typography.caption,
    color: Colors.neutral.gray6,
  },
  concernCheckmark: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary.pinkDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
});