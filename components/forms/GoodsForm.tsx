import {View,Text, useColorScheme, TextInput, StyleSheet,} from 'react-native';
import {useState} from "react";
import {Picker} from "@react-native-picker/picker";
import {MoneyUnitEnum} from "@/enitities/enums/MoneyUnitEnum";

const GoodsForm = () => {

    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const theme = {
        background: isDark ? '#121212' : '#ffffff',
        text: isDark ? '#f1f5f9' : '#1e293b',
        inputBackground: isDark ? '#1e293b' : '#f1f5f9',
        border: isDark ? '#334155' : '#cbd5e1',
    };

    const [price, setPrice] = useState('');
    const [moneyUnit, setMoneyUnit] = useState('eur');

    return (
        <View style={styles.container}>
            <Text style={[styles.label, { color: theme.text }]}>Habits et chaussures en cuir</Text>

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
                    placeholder="Prix"
                    placeholderTextColor={theme.border}
                    value={price}
                    onChangeText={(priceChange) => setPrice(priceChange)}
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
                        selectedValue={moneyUnit}
                        onValueChange={(itemValue) => setMoneyUnit(itemValue)}
                        style={{ color: theme.text }}
                    >
                        <Picker.Item label="EURO" value={MoneyUnitEnum.EURO} />
                        <Picker.Item label="USD" value={MoneyUnitEnum.DOLLAR_US} />
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
  
  export default GoodsForm;