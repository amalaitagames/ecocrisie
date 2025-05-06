import {StyleSheet, Text, TextInput, useColorScheme, View} from 'react-native';
import {useState} from "react";
import {Picker} from "@react-native-picker/picker";
import {DataUnitEnum} from "@/enitities/enums/DataUnitEnum";
import {EnumActivityType} from "@/enitities/enums/EnumActivityType";
import {InfoAndComRequestParams} from "@/enitities/InfoAndComRequestParams";

const InfoCommForm = (props) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const theme = {
        background: isDark ? '#121212' : '#ffffff',
        text: isDark ? '#f1f5f9' : '#1e293b',
        inputBackground: isDark ? '#1e293b' : '#f1f5f9',
        border: isDark ? '#334155' : '#cbd5e1',
    };

    const [data, setData] = useState('');
    const [dataSize, setDataSize] = useState(DataUnitEnum.MEGABYTE);

    const buildInfoRequest = () => {
        let infoRequest: InfoAndComRequestParams = {
            data: +data,
            data_unit: dataSize.toString(),
        }
        props.onSubmit(infoRequest, EnumActivityType.INFO);
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.label, { color: theme.text }]}>Requêtes Web sur AWS</Text>

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
                    placeholder="10, 100, ..."
                    placeholderTextColor={theme.border}
                    value={data}
                    onChangeText={(dataChange) => {
                        setData(dataChange)
                        buildInfoRequest()
                    }}
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
                        selectedValue={dataSize}
                        onValueChange={(itemValue) => {
                            setDataSize(itemValue)
                            buildInfoRequest()
                        }}
                        style={{ color: theme.text }}
                    >
                        <Picker.Item label={DataUnitEnum.MEGABYTE} value={DataUnitEnum.MEGABYTE} />
                        <Picker.Item label={DataUnitEnum.GIGABYTE} value={DataUnitEnum.GIGABYTE} />
                        <Picker.Item label={DataUnitEnum.TERABYTE} value={DataUnitEnum.TERABYTE} />
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

  export default InfoCommForm;