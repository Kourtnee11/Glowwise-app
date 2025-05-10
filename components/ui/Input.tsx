import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import { Eye, EyeOff, X } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  clearable?: boolean;
  secure?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  clearable = false,
  secure = false,
  value,
  onChangeText,
  ...restProps
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(secure);
  
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  
  const handleClear = () => {
    if (onChangeText) {
      onChangeText('');
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}
      
      <View style={[
        styles.inputContainer,
        error ? styles.inputError : null
      ]}>
        <TextInput
          style={[styles.input, inputStyle]}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={Colors.neutral.gray4}
          {...restProps}
        />
        
        {value && clearable && (
          <TouchableOpacity style={styles.icon} onPress={handleClear}>
            <X size={18} color={Colors.neutral.gray5} />
          </TouchableOpacity>
        )}
        
        {secure && (
          <TouchableOpacity style={styles.icon} onPress={toggleSecureEntry}>
            {secureTextEntry ? (
              <Eye size={18} color={Colors.neutral.gray5} />
            ) : (
              <EyeOff size={18} color={Colors.neutral.gray5} />
            )}
          </TouchableOpacity>
        )}
      </View>
      
      {error && (
        <Text style={[styles.error, errorStyle]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    ...Typography.subtitle2,
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral.gray3,
    borderRadius: 12,
    backgroundColor: Colors.neutral.white,
    overflow: 'hidden',
  },
  inputError: {
    borderColor: Colors.status.error,
  },
  input: {
    ...Typography.body1,
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  icon: {
    padding: 12,
  },
  error: {
    ...Typography.caption,
    color: Colors.status.error,
    marginTop: 4,
  },
});

export default Input;