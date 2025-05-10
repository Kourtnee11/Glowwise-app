import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Switch
} from 'react-native';
import { useRouter } from 'expo-router';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import { useAppContext } from '@/context/AppContext';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import { 
  User, 
  Settings, 
  Bell, 
  Heart, 
  ClipboardList, 
  Camera, 
  CalendarClock,
  ChevronRight,
  LogOut,
  Shield
} from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const { userProfile, wishlist } = useAppContext();
  
  // State for settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  
  // Navigate to other screens
  const navigateTo = (path: string) => {
    router.push(path);
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Avatar 
          size="large" 
          name="User" 
          style={styles.avatar}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Skincare Lover</Text>
          <Text style={styles.profileEmail}>user@example.com</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
      
      {/* Skin Profile Card */}
      <Card style={styles.skinProfileCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>My Skin Profile</Text>
          <TouchableOpacity 
            style={styles.editIconButton}
            onPress={() => navigateTo('/quiz')}
          >
            <Text style={styles.editIconText}>Update</Text>
          </TouchableOpacity>
        </View>
        
        {userProfile.completed ? (
          <View style={styles.skinProfileContent}>
            <View style={styles.skinProfileItem}>
              <Text style={styles.skinProfileLabel}>Skin Type:</Text>
              <Text style={styles.skinProfileValue}>{userProfile.skinType || 'Not specified'}</Text>
            </View>
            
            <View style={styles.skinProfileItem}>
              <Text style={styles.skinProfileLabel}>Top Concerns:</Text>
              <View style={styles.concernsContainer}>
                {userProfile.concerns && userProfile.concerns.length > 0 ? (
                  userProfile.concerns.map((concern, index) => (
                    <Text key={index} style={styles.concernItem}>
                      {concern}{index < (userProfile.concerns?.length || 0) - 1 ? ', ' : ''}
                    </Text>
                  ))
                ) : (
                  <Text style={styles.skinProfileValue}>None specified</Text>
                )}
              </View>
            </View>
            
            <View style={styles.skinProfileItem}>
              <Text style={styles.skinProfileLabel}>Sensitivity:</Text>
              <Text style={styles.skinProfileValue}>{userProfile.sensitivity || 'Not specified'}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.emptyProfileContent}>
            <Text style={styles.emptyProfileText}>
              You haven't completed your skin profile yet. Take the quiz to get personalized recommendations.
            </Text>
            <Button
              title="Take Skin Quiz"
              onPress={() => navigateTo('/quiz')}
              variant="primary"
              size="small"
              style={styles.quizButton}
            />
          </View>
        )}
      </Card>
      
      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>My GlowWise</Text>
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.quickAction}
          onPress={() => navigateTo('/routines')}
        >
          <View style={[styles.actionIcon, { backgroundColor: Colors.tertiary.mintLight }]}>
            <CalendarClock size={24} color={Colors.tertiary.mintDark} />
          </View>
          <Text style={styles.actionText}>My Routines</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.quickAction}
          onPress={() => {}}
        >
          <View style={[styles.actionIcon, { backgroundColor: Colors.primary.pinkLight }]}>
            <Heart size={24} color={Colors.primary.pinkDark} />
          </View>
          <Text style={styles.actionText}>Wishlist</Text>
          {wishlist.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{wishlist.length}</Text>
            </View>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.quickAction}
          onPress={() => {}}
        >
          <View style={[styles.actionIcon, { backgroundColor: Colors.secondary.lavenderLight }]}>
            <Camera size={24} color={Colors.secondary.lavenderDark} />
          </View>
          <Text style={styles.actionText}>Skin Diary</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.quickAction}
          onPress={() => navigateTo('/quiz')}
        >
          <View style={[styles.actionIcon, { backgroundColor: Colors.accent.goldLight }]}>
            <ClipboardList size={24} color={Colors.accent.goldDark} />
          </View>
          <Text style={styles.actionText}>Skin Quiz</Text>
        </TouchableOpacity>
      </View>
      
      {/* Settings */}
      <Text style={styles.sectionTitle}>Settings</Text>
      <Card style={styles.settingsCard}>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Bell size={20} color={Colors.neutral.gray7} style={styles.settingIcon} />
            <Text style={styles.settingText}>Notifications</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: Colors.neutral.gray3, true: Colors.primary.pinkLight }}
            thumbColor={notificationsEnabled ? Colors.primary.pinkDark : Colors.neutral.gray5}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Settings size={20} color={Colors.neutral.gray7} style={styles.settingIcon} />
            <Text style={styles.settingText}>Dark Mode</Text>
          </View>
          <Switch
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
            trackColor={{ false: Colors.neutral.gray3, true: Colors.primary.pinkLight }}
            thumbColor={darkModeEnabled ? Colors.primary.pinkDark : Colors.neutral.gray5}
          />
        </View>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Shield size={20} color={Colors.neutral.gray7} style={styles.settingIcon} />
            <Text style={styles.settingText}>Privacy Settings</Text>
          </View>
          <ChevronRight size={20} color={Colors.neutral.gray5} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <User size={20} color={Colors.neutral.gray7} style={styles.settingIcon} />
            <Text style={styles.settingText}>Account Settings</Text>
          </View>
          <ChevronRight size={20} color={Colors.neutral.gray5} />
        </TouchableOpacity>
      </Card>
      
      {/* Log Out Button */}
      <Button
        title="Log Out"
        onPress={() => {}}
        variant="outline"
        size="medium"
        style={styles.logoutButton}
        leftIcon={<LogOut size={18} color={Colors.primary.pinkDark} />}
      />
      
      {/* App Info */}
      <View style={styles.appInfo}>
        <Text style={styles.appVersion}>GlowWise v1.0.0</Text>
        <Text style={styles.copyright}>© 2025 GlowWise. All rights reserved.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.gray1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...Typography.subtitle1,
    marginBottom: 4,
  },
  profileEmail: {
    ...Typography.body2,
    color: Colors.neutral.gray6,
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: Colors.primary.pinkLight,
  },
  editButtonText: {
    ...Typography.button,
    fontSize: 14,
    color: Colors.primary.pinkDark,
  },
  skinProfileCard: {
    marginBottom: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    ...Typography.subtitle1,
  },
  editIconButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: Colors.neutral.gray1,
  },
  editIconText: {
    ...Typography.caption,
    color: Colors.neutral.gray7,
  },
  skinProfileContent: {
    gap: 12,
  },
  skinProfileItem: {
    marginBottom: 8,
  },
  skinProfileLabel: {
    ...Typography.subtitle2,
    marginBottom: 4,
  },
  skinProfileValue: {
    ...Typography.body1,
    color: Colors.neutral.gray7,
  },
  concernsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  concernItem: {
    ...Typography.body1,
    color: Colors.neutral.gray7,
  },
  emptyProfileContent: {
    alignItems: 'center',
  },
  emptyProfileText: {
    ...Typography.body1,
    color: Colors.neutral.gray6,
    textAlign: 'center',
    marginBottom: 16,
  },
  quizButton: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    ...Typography.subtitle1,
    marginBottom: 12,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  quickAction: {
    alignItems: 'center',
    position: 'relative',
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    ...Typography.caption,
    textAlign: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.status.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    ...Typography.caption,
    fontSize: 10,
    color: Colors.neutral.white,
    fontWeight: 'bold',
  },
  settingsCard: {
    marginBottom: 24,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray2,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingText: {
    ...Typography.body1,
  },
  logoutButton: {
    marginBottom: 24,
  },
  appInfo: {
    alignItems: 'center',
  },
  appVersion: {
    ...Typography.caption,
    color: Colors.neutral.gray6,
    marginBottom: 4,
  },
  copyright: {
    ...Typography.caption,
    color: Colors.neutral.gray5,
  },
});