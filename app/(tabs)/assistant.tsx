import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native';
import Button from '@/components/ui/Button';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import { Send, Sparkles, User, Info, ArrowRight } from 'lucide-react-native';

// Types for chat
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

// Suggested questions
const SUGGESTED_QUESTIONS = [
  'What products are best for dry skin?',
  'How do I layer skincare products?',
  'What ingredients help with acne?',
  'How often should I exfoliate?',
  'What is double cleansing?',
  'How do I build a K-beauty routine?'
];

// Mock AI responses
const AI_RESPONSES: Record<string, string> = {
  'What products are best for dry skin?': 
    'For dry skin, focus on hydrating and nourishing products. Look for:\n\n• Cleansers: Cream or oil-based, avoid foaming cleansers\n• Toners: Hydrating toners with hyaluronic acid\n• Essences: Snail mucin, fermented essences, or anything with "hydrating" or "moisturizing" in the name\n• Serums: Hyaluronic acid, ceramides, squalane\n• Moisturizers: Richer creams with shea butter, ceramides, or oils\n• Sleeping masks: Use these 2-3 times a week for an extra moisture boost\n\nKey ingredients to look for: Hyaluronic acid, glycerin, ceramides, fatty alcohols, plant oils, squalane, and snail mucin.',
  
  'How do I layer skincare products?': 
    'The general rule for layering Korean skincare is to go from thinnest to thickest consistency. Here\'s the proper order:\n\n1. Oil cleanser (PM)\n2. Water-based cleanser\n3. Exfoliator (2-3 times a week)\n4. Toner\n5. Essence\n6. Treatments (ampoules, boosters)\n7. Serums\n8. Sheet mask (optional, 1-3 times a week)\n9. Eye cream\n10. Moisturizer\n11. Face oil (optional, for very dry skin)\n12. Sunscreen (AM only)\n13. Sleeping mask (PM, optional)\n\nWait about 30 seconds between layers to allow each product to absorb.',
  
  'What ingredients help with acne?': 
    'Several Korean skincare ingredients are effective for acne:\n\n• BHA (Betaine Salicylate or Salicylic Acid): Unclogs pores and removes dead skin cells\n• AHA (Glycolic Acid): Surface exfoliation to prevent clogged pores\n• Centella Asiatica: Calms inflammation and redness\n• Tea Tree Oil: Natural antibacterial properties\n• Niacinamide: Regulates sebum production and reduces inflammation\n• Propolis: Anti-inflammatory and antibacterial\n• Snail Mucin: Promotes healing and reduces scarring\n• Zinc: Controls oil production\n• Sulfur: Antimicrobial properties\n\nLook for lightweight, non-comedogenic formulations and avoid heavy oils or creams that might clog pores.',
  
  'How often should I exfoliate?': 
    'Exfoliation frequency depends on your skin type and the product you\'re using:\n\n• Sensitive skin: Once a week or less with a gentle PHA exfoliant\n• Dry skin: 1-2 times a week with AHAs like glycolic or lactic acid\n• Normal skin: 2-3 times a week, alternating between AHAs and BHAs\n• Oily/acne-prone skin: 2-3 times a week with BHAs like salicylic acid\n\nSigns of over-exfoliation include redness, sensitivity, tightness, shininess, and increased breakouts. If you experience these, cut back and focus on hydration and repairing your skin barrier.',
  
  'What is double cleansing?': 
    'Double cleansing is a two-step cleansing method that\'s fundamental to Korean skincare:\n\n1. First cleanser (oil-based): Removes oil-based impurities like makeup, sunscreen, sebum, and pollution. Use cleansing oils, balms, or micellar water.\n\n2. Second cleanser (water-based): Removes water-based impurities like sweat and dirt. Use foam, gel, or cream cleansers.\n\nBenefits include:\n• More thorough cleansing without stripping the skin\n• Better removal of sunscreen and makeup\n• Improved absorption of subsequent skincare products\n• Helps prevent breakouts\n\nDouble cleanse in the evening; in the morning, a single water-based cleanser is usually sufficient.',
  
  'How do I build a K-beauty routine?': 
    'To build a K-beauty routine, start with these essential steps and add more as needed:\n\nBasic (Beginner) Routine:\n1. Cleanser (double cleanse at night)\n2. Toner\n3. Moisturizer\n4. Sunscreen (morning only)\n\nIntermediate Routine:\n1. Cleansers\n2. Toner\n3. Essence\n4. Serum targeted to your skin concerns\n5. Moisturizer\n6. Sunscreen (morning) / Sleeping mask (night, occasionally)\n\nAdvanced Routine:\n1. Cleansers\n2. Exfoliator (2-3x weekly)\n3. Toner\n4. Essence\n5. Multiple serums or ampoules for different concerns\n6. Sheet mask (1-3x weekly)\n7. Eye cream\n8. Moisturizer\n9. Face oil (if needed)\n10. Sunscreen (morning) / Sleeping mask (night)\n\nStart simple and add products gradually to see how your skin reacts.',
};

// Default response for unknown questions
const DEFAULT_RESPONSE = "I don't have specific information about that, but I'd be happy to help with questions about Korean skincare ingredients, routines, product recommendations, or skin concerns. Feel free to ask me something related to K-beauty!";

export default function AssistantScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: "Hi there! I'm your GlowWise K-beauty assistant. I can help you with skincare advice, product recommendations, and routine building. What would you like to know about Korean skincare?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Send a message
  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText('');
    setLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const question = Object.keys(AI_RESPONSES).find(
        q => inputText.toLowerCase().includes(q.toLowerCase())
      );
      
      const responseText = question ? AI_RESPONSES[question] : DEFAULT_RESPONSE;
      
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        text: responseText,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      setLoading(false);
      
      // Scroll to bottom
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 1500);
  };
  
  // Handle sending a suggested question
  const handleSuggestedQuestion = (question: string) => {
    setInputText(question);
    handleSendMessage();
  };
  
  // Format message text with line breaks
  const formatMessageText = (text: string) => {
    return text.split('\n').map((line, index) => (
      <Text key={index} style={styles.messageText}>
        {line}
        {index < text.split('\n').length - 1 && '\n'}
      </Text>
    ));
  };
  
  // Render a message bubble
  const renderMessage = (message: Message) => (
    <View
      key={message.id}
      style={[
        styles.messageBubble,
        message.sender === 'user' ? styles.userBubble : styles.assistantBubble
      ]}
    >
      {message.sender === 'assistant' && (
        <View style={styles.assistantAvatar}>
          <Sparkles size={16} color={Colors.neutral.white} />
        </View>
      )}
      
      {message.sender === 'user' && (
        <View style={styles.userAvatar}>
          <User size={16} color={Colors.neutral.white} />
        </View>
      )}
      
      <View 
        style={[
          styles.messageContent,
          message.sender === 'user' ? styles.userContent : styles.assistantContent
        ]}
      >
        {formatMessageText(message.text)}
      </View>
    </View>
  );
  
  // Render suggested questions
  const renderSuggestedQuestions = () => (
    <View style={styles.suggestedContainer}>
      <View style={styles.suggestedHeader}>
        <Info size={16} color={Colors.primary.pinkDark} />
        <Text style={styles.suggestedTitle}>Suggested Questions</Text>
      </View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.suggestedQuestionsContainer}
      >
        {SUGGESTED_QUESTIONS.map((question, index) => (
          <TouchableOpacity
            key={index}
            style={styles.suggestedQuestion}
            onPress={() => handleSuggestedQuestion(question)}
          >
            <Text style={styles.suggestedQuestionText}>{question}</Text>
            <ArrowRight size={14} color={Colors.primary.pinkDark} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      {/* Assistant character */}
      <View style={styles.characterContainer}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/8434772/pexels-photo-8434772.jpeg?auto=compress&cs=tinysrgb&w=800' }}
          style={styles.characterImage}
        />
        <View style={styles.characterContent}>
          <Text style={styles.characterName}>GlowWise Assistant</Text>
          <Text style={styles.characterDescription}>
            Ask me anything about Korean skincare!
          </Text>
        </View>
      </View>
      
      {/* Suggested questions */}
      {messages.length === 1 && renderSuggestedQuestions()}
      
      {/* Message list */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map(renderMessage)}
        
        {loading && (
          <View style={[styles.messageBubble, styles.assistantBubble]}>
            <View style={styles.assistantAvatar}>
              <Sparkles size={16} color={Colors.neutral.white} />
            </View>
            <View style={[styles.messageContent, styles.assistantContent]}>
              <Text style={styles.typingIndicator}>Typing...</Text>
            </View>
          </View>
        )}
      </ScrollView>
      
      {/* Input area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your question..."
          placeholderTextColor={Colors.neutral.gray4}
          multiline
          returnKeyType="send"
          onSubmitEditing={handleSendMessage}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            !inputText.trim() ? styles.sendButtonDisabled : null
          ]}
          onPress={handleSendMessage}
          disabled={!inputText.trim() || loading}
        >
          <Send 
            size={20} 
            color={!inputText.trim() ? Colors.neutral.gray4 : Colors.neutral.white} 
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.gray1,
  },
  characterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray2,
  },
  characterImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  characterContent: {
    flex: 1,
  },
  characterName: {
    ...Typography.subtitle1,
    marginBottom: 2,
  },
  characterDescription: {
    ...Typography.body2,
    color: Colors.neutral.gray6,
  },
  suggestedContainer: {
    padding: 16,
    backgroundColor: Colors.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray2,
  },
  suggestedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  suggestedTitle: {
    ...Typography.subtitle2,
    marginLeft: 6,
  },
  suggestedQuestionsContainer: {
    paddingRight: 16,
  },
  suggestedQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary.pinkLight,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  suggestedQuestionText: {
    ...Typography.body2,
    color: Colors.primary.pinkDark,
    marginRight: 6,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingTop: 8,
  },
  messageBubble: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '85%',
  },
  userBubble: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  assistantBubble: {
    alignSelf: 'flex-start',
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.neutral.gray6,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  assistantAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary.pinkDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  messageContent: {
    padding: 12,
    borderRadius: 16,
  },
  userContent: {
    backgroundColor: Colors.secondary.lavender,
    borderTopRightRadius: 4,
  },
  assistantContent: {
    backgroundColor: Colors.neutral.white,
    borderTopLeftRadius: 4,
    borderWidth: 1,
    borderColor: Colors.neutral.gray2,
  },
  messageText: {
    ...Typography.body1,
  },
  typingIndicator: {
    ...Typography.body2,
    color: Colors.neutral.gray6,
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.neutral.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray2,
  },
  input: {
    flex: 1,
    ...Typography.body1,
    backgroundColor: Colors.neutral.gray1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary.pinkDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: Colors.neutral.gray3,
  },
});