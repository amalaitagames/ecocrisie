import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const WasteForm = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const theme = {
    background: isDark ? '#121212' : '#ffffff',
    text: isDark ? '#f1f5f9' : '#1e293b',
    inputBackground: isDark ? '#1e293b' : '#f1f5f9',
    border: isDark ? '#334155' : '#cbd5e1',
  };

  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('kg');

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.text }]}>Déchets</Text>

      <View style={styles.row}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
              color: theme.text,
            },
          ]}
          keyboardType="numeric"
          placeholder="Poids"
          placeholderTextColor={theme.border}
          value={weight}
          onChangeText={setWeight}
        />

        <View
          style={[
            styles.pickerWrapper,
            {
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
            },
          ]}
        >
          <Picker
            selectedValue={unit}
            onValueChange={(itemValue) => setUnit(itemValue)}
            style={{ color: theme.text }}
          >
            <Picker.Item label="g" value="g" />
            <Picker.Item label="kg" value="kg" />
            <Picker.Item label="t" value="t" />
            <Picker.Item label="ton" value="ton" />
            <Picker.Item label="lb" value="lb" />
          </Picker>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 16,
  },
  pickerWrapper: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
  },
});

export default WasteForm;
