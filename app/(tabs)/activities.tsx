import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View,} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useRouter} from 'expo-router';

import WasteForm from '../../components/forms/WasteForm';
import InfoCommForm from '../../components/forms/InfoCommForm';
import GoodsForm from '../../components/forms/GoodsForm';
import {ClimatiqApiService} from "@/service/climatiq.api.service";
import {ClimatiqRequest} from "@/enitities/ClimatiqRequest";
import {EnumActivityType} from "@/enitities/enums/EnumActivityType";
import {InfoAndComRequestParams} from "@/enitities/InfoAndComRequestParams";
import {GoodAndServicesRequestParams} from "@/enitities/GoodAndServicesRequestParams";
import {WasteRequestParams} from "@/enitities/WasteRequestParams";

export default function ActivitiesScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [activityType, setActivityType] = useState('waste');
  const [activityRequest, setActivityRequest] = useState<ClimatiqRequest>();
  const isDark = colorScheme === 'dark';
  const theme = {
    background: isDark ? '#121212' : '#ffffff',
    text: isDark ? '#f1f5f9' : '#1e293b',
    card: isDark ? '#1e293b' : '#f8fafc',
    subtext: isDark ? '#cbd5e1' : '#475569',
    primary: '#10b981',
  };
  const dataVersion = '^0';

  const buildRequest = (activityRequestBuild: InfoAndComRequestParams | GoodAndServicesRequestParams | WasteRequestParams , activityType: EnumActivityType) => {
   let request: ClimatiqRequest;
    switch (activityType) {
      case EnumActivityType.INFO: {
        request = {
          emissionFactor: {
            activityId: 'networking-provider_aws-region_eu_west_3',
            dataVersion: dataVersion
          },
          activityParameters: activityRequestBuild,
        }
      }
      break;
      case EnumActivityType.GOOD:
        request = {
          emissionFactor: {
            activityId: 'textiles-type_textiles',
            dataVersion: dataVersion
          },
          activityParameters: activityRequestBuild,
        }
      break;
      case EnumActivityType.WASTE:
        request = {
          emissionFactor: {
            activityId: 'waste-type_batteries_and_accumulators-disposal_method_average_end_of_life',
            dataVersion: dataVersion
          },
          activityParameters: activityRequestBuild,
        }
      break;
    }
    setActivityRequest(request);
  }

  const renderDynamicForm = () => {
    switch (activityType) {
      case 'waste':
        return <WasteForm onSubmit={buildRequest}/>;
      case 'information and communication':
        return <InfoCommForm onSubmit={buildRequest}/>;
      case 'goods and services':
        return <GoodsForm onSubmit={buildRequest}/>;
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    let appelApi = new ClimatiqApiService();
    if(activityRequest !== undefined) {
      appelApi.getCo2Consommation(activityRequest).then(
          value => {
          // TODO faire ça bien
            alert("La consommation de C02 est de Xkg")
          }
      )
    }

  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.title, { color: theme.text }]}>Calculer l’empreinte carbone</Text>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>Type d’activité</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={activityType}
              onValueChange={(itemValue) => {
                setActivityType(itemValue);
              }}
              style={{ color: theme.text }}
            >
              <Picker.Item label="Déchets" value="waste" />
              <Picker.Item label="Information et Communication" value="information and communication" />
              <Picker.Item label="Biens et Services" value="goods and services" />
            </Picker>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          {renderDynamicForm()}
        </View>

        <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Soumettre</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
          <Text style={{ color: theme.subtext }}>⬅ Revenir à l’accueil</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 24,
    marginTop: 40,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 12,
  },
  pickerWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  button: {
    marginTop: 16,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 32,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  backLink: {
    marginTop: 24,
  },
});
