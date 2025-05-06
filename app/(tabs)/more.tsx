import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

export default function MoreInfoScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const isDark = colorScheme === 'dark';

  const theme = {
    background: isDark ? '#121212' : '#ffffff',
    text: isDark ? '#f1f5f9' : '#1e293b',
    card: isDark ? '#1e293b' : '#f8fafc',
    subtext: isDark ? '#cbd5e1' : '#475569',
    primary: '#10b981',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.title, { color: theme.text }]}>Pourquoi Ecocrisie ?</Text>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={styles.icon}>🌍</Text>
          <Text style={[styles.cardTitle, { color: theme.text }]}>Sensibiliser</Text>
          <Text style={[styles.cardText, { color: theme.subtext }]}>
            Nous voulons faire comprendre l’impact environnemental croissant de l’intelligence artificielle.
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={styles.icon}>💡</Text>
          <Text style={[styles.cardTitle, { color: theme.text }]}>Informer</Text>
          <Text style={[styles.cardText, { color: theme.subtext }]}>
            À travers un quiz, vous découvrez des chiffres clés et des idées reçues sur l’IA.
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={styles.icon}>🤝</Text>
          <Text style={[styles.cardTitle, { color: theme.text }]}>Agir</Text>
          <Text style={[styles.cardText, { color: theme.subtext }]}>
            L’application vous propose des gestes simples pour adopter un usage plus responsable du numérique.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Revenir à l’accueil</Text>
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
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    width: '100%',
  },
  icon: {
    fontSize: 32,
    marginBottom: 12,
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardText: {
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    marginTop: 32,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 32,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
