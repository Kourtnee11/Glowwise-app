import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  FlatList
} from 'react-native';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAppContext } from '@/context/AppContext';
import { Plus, Moon, Sun, Edit2, Trash2, Check, DragHorizontal } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';

// Step types for routine
const ROUTINE_STEPS = [
  { 
    id: 'cleanser', 
    name: 'Cleanser', 
    description: 'Remove dirt, oil, and makeup',
    icon: '🧼',
    order: 1,
  },
  { 
    id: 'toner', 
    name: 'Toner', 
    description: 'Balance pH and prep skin',
    icon: '💧',
    order: 2,
  },
  { 
    id: 'essence', 
    name: 'Essence', 
    description: 'Lightweight hydration',
    icon: '💦',
    order: 3,
  },
  { 
    id: 'serum', 
    name: 'Serum', 
    description: 'Target specific concerns',
    icon: '⚗️',
    order: 4,
  },
  { 
    id: 'ampoule', 
    name: 'Ampoule', 
    description: 'Concentrated treatment',
    icon: '💉',
    order: 5,
  },
  { 
    id: 'eye-cream', 
    name: 'Eye Cream', 
    description: 'For delicate eye area',
    icon: '👁️',
    order: 6,
  },
  { 
    id: 'moisturizer', 
    name: 'Moisturizer', 
    description: 'Hydrate and seal in moisture',
    icon: '🧴',
    order: 7,
  },
  { 
    id: 'sunscreen', 
    name: 'Sunscreen', 
    description: 'Protect from UV rays',
    icon: '☀️',
    order: 8,
    morningOnly: true,
  },
  { 
    id: 'sleeping-mask', 
    name: 'Sleeping Mask', 
    description: 'Overnight nourishment',
    icon: '😴',
    order: 9,
    eveningOnly: true,
  },
];

interface EditingRoutine {
  id: string;
  name: string;
  type: 'morning' | 'evening';
  steps: {
    id: string;
    type: string;
    productId?: string;
    productName?: string;
  }[];
}

export default function RoutinesScreen() {
  const { routines, addRoutine, updateRoutine, deleteRoutine } = useAppContext();
  
  const [activeTab, setActiveTab] = useState<'morning' | 'evening'>('morning');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRoutine, setEditingRoutine] = useState<EditingRoutine | null>(null);
  const [routineName, setRoutineName] = useState('');
  
  // Filter routines by type
  const filteredRoutines = routines.filter(routine => routine.type === activeTab);
  
  // Start creating a new routine
  const handleCreateRoutine = () => {
    const newId = `routine-${Date.now()}`;
    // Filter steps based on time of day
    const filteredSteps = ROUTINE_STEPS
      .filter(step => 
        activeTab === 'morning' ? !step.eveningOnly : !step.morningOnly
      )
      .map(step => ({
        id: `${newId}-step-${step.id}`,
        type: step.id,
        productName: ''
      }));
    
    setEditingRoutine({
      id: newId,
      name: `My ${activeTab === 'morning' ? 'Morning' : 'Evening'} Routine`,
      type: activeTab,
      steps: filteredSteps
    });
    
    setRoutineName(`My ${activeTab === 'morning' ? 'Morning' : 'Evening'} Routine`);
    setIsCreating(true);
  };
  
  // Start editing an existing routine
  const handleEditRoutine = (routineId: string) => {
    const routine = routines.find(r => r.id === routineId);
    if (routine) {
      setEditingRoutine({
        ...routine,
        steps: [...routine.steps]
      });
      setRoutineName(routine.name);
      setIsEditing(true);
    }
  };
  
  // Delete a routine
  const handleDeleteRoutine = (routineId: string) => {
    deleteRoutine(routineId);
  };
  
  // Save the current editing routine
  const handleSaveRoutine = () => {
    if (editingRoutine) {
      const updatedRoutine = {
        ...editingRoutine,
        name: routineName.trim() || `My ${activeTab === 'morning' ? 'Morning' : 'Evening'} Routine`
      };
      
      if (isCreating) {
        addRoutine(updatedRoutine);
      } else if (isEditing) {
        updateRoutine(updatedRoutine.id, updatedRoutine);
      }
      
      setIsCreating(false);
      setIsEditing(false);
      setEditingRoutine(null);
    }
  };
  
  // Cancel editing/creating
  const handleCancelEdit = () => {
    setIsCreating(false);
    setIsEditing(false);
    setEditingRoutine(null);
  };
  
  // Update product name for a step
  const handleUpdateStepProduct = (stepId: string, productName: string) => {
    if (editingRoutine) {
      const updatedSteps = editingRoutine.steps.map(step => 
        step.id === stepId ? { ...step, productName } : step
      );
      
      setEditingRoutine({
        ...editingRoutine,
        steps: updatedSteps
      });
    }
  };
  
  // Toggle step completion
  const handleToggleStepCompletion = (routineId: string, stepId: string) => {
    const routine = routines.find(r => r.id === routineId);
    if (routine) {
      const updatedSteps = routine.steps.map(step => 
        step.id === stepId ? { ...step, completed: !step.completed } : step
      );
      
      updateRoutine(routineId, {
        steps: updatedSteps
      });
    }
  };
  
  // Get step details by type
  const getStepDetails = (stepType: string) => {
    return ROUTINE_STEPS.find(step => step.id === stepType) || ROUTINE_STEPS[0];
  };
  
  // Render routine cards
  const renderRoutineCard = ({ item }: { item: typeof routines[0] }) => {
    // Count completed steps
    const completedSteps = item.steps.filter(step => step.completed).length;
    const progressPercentage = Math.round((completedSteps / item.steps.length) * 100);
    
    return (
      <Card style={styles.routineCard}>
        <View style={styles.routineHeader}>
          <Text style={styles.routineName}>{item.name}</Text>
          <View style={styles.routineActions}>
            <TouchableOpacity 
              style={styles.routineAction}
              onPress={() => handleEditRoutine(item.id)}
            >
              <Edit2 size={18} color={Colors.neutral.gray6} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.routineAction}
              onPress={() => handleDeleteRoutine(item.id)}
            >
              <Trash2 size={18} color={Colors.neutral.gray6} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${progressPercentage}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {completedSteps} of {item.steps.length} steps completed
          </Text>
        </View>
        
        <View style={styles.stepsContainer}>
          {item.steps.map(step => {
            const stepDetails = getStepDetails(step.type);
            return (
              <View key={step.id} style={styles.stepItem}>
                <TouchableOpacity
                  style={[
                    styles.stepCheckbox,
                    step.completed ? styles.stepCheckboxCompleted : null
                  ]}
                  onPress={() => handleToggleStepCompletion(item.id, step.id)}
                >
                  {step.completed && (
                    <Check size={14} color={Colors.neutral.white} />
                  )}
                </TouchableOpacity>
                
                <View style={styles.stepContent}>
                  <View style={styles.stepHeader}>
                    <Text style={styles.stepIcon}>{stepDetails.icon}</Text>
                    <Text style={styles.stepName}>{stepDetails.name}</Text>
                  </View>
                  
                  <Text style={styles.productName} numberOfLines={1}>
                    {step.productName || 'No product selected'}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </Card>
    );
  };
  
  // Render the editor for creating/editing routines
  const renderRoutineEditor = () => {
    if (!editingRoutine) return null;
    
    return (
      <View style={styles.editorContainer}>
        <View style={styles.editorHeader}>
          <Text style={styles.editorTitle}>
            {isCreating ? 'Create New Routine' : 'Edit Routine'}
          </Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleCancelEdit}
          >
            <Text style={styles.closeButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.editorContent}>
          <Input
            label="Routine Name"
            value={routineName}
            onChangeText={setRoutineName}
            placeholder="My Morning Routine"
          />
          
          <Text style={styles.editorSectionTitle}>Routine Steps</Text>
          <Text style={styles.editorSectionDescription}>
            Add products to each step in your routine.
          </Text>
          
          {editingRoutine.steps.map(step => {
            const stepDetails = getStepDetails(step.type);
            return (
              <View key={step.id} style={styles.editorStepItem}>
                <View style={styles.editorStepHeader}>
                  <View style={styles.editorStepInfo}>
                    <Text style={styles.editorStepIcon}>{stepDetails.icon}</Text>
                    <View>
                      <Text style={styles.editorStepName}>{stepDetails.name}</Text>
                      <Text style={styles.editorStepDescription}>{stepDetails.description}</Text>
                    </View>
                  </View>
                  <DragHorizontal size={24} color={Colors.neutral.gray4} />
                </View>
                
                <Input
                  placeholder="Add product name"
                  value={step.productName}
                  onChangeText={(text) => handleUpdateStepProduct(step.id, text)}
                />
              </View>
            );
          })}
          
          <Button
            title="Save Routine"
            onPress={handleSaveRoutine}
            variant="primary"
            size="large"
            style={styles.saveButton}
            fullWidth
          />
        </ScrollView>
      </View>
    );
  };
  
  // Render empty state when no routines
  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Image
        source={{ uri: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=800' }}
        style={styles.emptyStateImage}
      />
      <Text style={styles.emptyStateTitle}>No Routines Yet</Text>
      <Text style={styles.emptyStateText}>
        Create your first {activeTab === 'morning' ? 'morning' : 'evening'} skincare routine to keep track of your products and steps.
      </Text>
      <Button
        title={`Create ${activeTab === 'morning' ? 'Morning' : 'Evening'} Routine`}
        onPress={handleCreateRoutine}
        variant="primary"
        size="medium"
        style={styles.emptyStateButton}
      />
    </View>
  );
  
  return (
    <View style={styles.container}>
      {/* Tabs for Morning/Evening */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'morning' ? styles.activeTab : null]}
          onPress={() => setActiveTab('morning')}
        >
          <Sun 
            size={20} 
            color={activeTab === 'morning' ? Colors.primary.pinkDark : Colors.neutral.gray6} 
          />
          <Text 
            style={[
              styles.tabText,
              activeTab === 'morning' ? styles.activeTabText : null
            ]}
          >
            Morning
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'evening' ? styles.activeTab : null]}
          onPress={() => setActiveTab('evening')}
        >
          <Moon 
            size={20} 
            color={activeTab === 'evening' ? Colors.primary.pinkDark : Colors.neutral.gray6} 
          />
          <Text 
            style={[
              styles.tabText,
              activeTab === 'evening' ? styles.activeTabText : null
            ]}
          >
            Evening
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Routines List or Empty State */}
      {filteredRoutines.length > 0 ? (
        <View style={styles.routinesContainer}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>
              Your {activeTab === 'morning' ? 'Morning' : 'Evening'} Routines
            </Text>
            
            <Button
              title="New Routine"
              onPress={handleCreateRoutine}
              variant="primary"
              size="small"
              style={styles.newButton}
              leftIcon={<Plus size={16} color={Colors.neutral.white} />}
            />
          </View>
          
          <FlatList
            data={filteredRoutines}
            renderItem={renderRoutineCard}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        renderEmptyState()
      )}
      
      {/* Routine Editor Modal */}
      {(isCreating || isEditing) && renderRoutineEditor()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.white,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray2,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary.pink,
  },
  tabText: {
    ...Typography.subtitle2,
    color: Colors.neutral.gray6,
  },
  activeTabText: {
    color: Colors.primary.pinkDark,
  },
  routinesContainer: {
    flex: 1,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  listTitle: {
    ...Typography.heading3,
  },
  newButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  routineCard: {
    marginBottom: 16,
  },
  routineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  routineName: {
    ...Typography.heading4,
  },
  routineActions: {
    flexDirection: 'row',
    gap: 8,
  },
  routineAction: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.neutral.gray1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    marginBottom: 16,
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
  stepsContainer: {
    gap: 12,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.gray4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCheckboxCompleted: {
    backgroundColor: Colors.status.success,
    borderColor: Colors.status.success,
  },
  stepContent: {
    flex: 1,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  stepName: {
    ...Typography.subtitle2,
  },
  productName: {
    ...Typography.body2,
    color: Colors.neutral.gray6,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyStateImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 24,
  },
  emptyStateTitle: {
    ...Typography.heading3,
    marginBottom: 8,
  },
  emptyStateText: {
    ...Typography.body1,
    color: Colors.neutral.gray6,
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyStateButton: {
    marginTop: 16,
  },
  editorContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.neutral.white,
    zIndex: 999,
  },
  editorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray2,
  },
  editorTitle: {
    ...Typography.heading3,
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    ...Typography.subtitle2,
    color: Colors.primary.pinkDark,
  },
  editorContent: {
    flex: 1,
    padding: 16,
  },
  editorSectionTitle: {
    ...Typography.subtitle1,
    marginTop: 16,
    marginBottom: 8,
  },
  editorSectionDescription: {
    ...Typography.body2,
    color: Colors.neutral.gray6,
    marginBottom: 16,
  },
  editorStepItem: {
    marginBottom: 16,
  },
  editorStepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  editorStepInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editorStepIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  editorStepName: {
    ...Typography.subtitle2,
  },
  editorStepDescription: {
    ...Typography.caption,
    color: Colors.neutral.gray6,
  },
  saveButton: {
    marginTop: 24,
    marginBottom: 40,
  },
});