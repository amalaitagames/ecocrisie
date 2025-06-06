import { getTheme } from "@/app/constants/theme";
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import ecoTips from '@/assets/json/tips.json';
import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View
} from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  const isDark = useColorScheme() === 'dark';
  const theme = getTheme(isDark);
  const [ecoTip, setEcoTip] = React.useState('');

  React.useEffect(() => {
    const randomIndex = Math.floor(Math.random() * ecoTips.length);
    setEcoTip(ecoTips[randomIndex]);
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundStart }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <View
        style={[
          styles.gradientBackground,
          {
            backgroundColor: theme.backgroundStart,
          },
        ]}
      >
        <View
          style={[
            styles.gradientOverlay,
            {
              backgroundColor: isDark
                ? 'rgba(30,30,30,0.85)'
                : 'rgba(255,255,255,0.85)',
            },
          ]}
        />
      </View>

      <View style={styles.contentWrapper}>
        <View style={styles.header}>
          <View style={[styles.logoCircle, { backgroundColor: isDark ? '#065f46' : '#d1fae5' }]}>
            <Text style={styles.logo}>🌱</Text>
          </View>
          <Text style={[styles.title, { color: theme.text }]}>Bienvenue sur Ecocrisie</Text>
          <View style={[styles.subtitleBox, { backgroundColor: theme.card }]}>
            <Text style={[styles.subtitle, { color: theme.subtext }]}>
              Explorez l&apos;impact écologique de l&apos;IA avec élégance, sobriété et engagement.
            </Text>
          </View>
        </View>

        <View style={styles.ecoGuide}>
          <Text style={styles.ecoEmoji}>🐞</Text>
          <View style={[styles.ecoBubble, { backgroundColor: theme.card }]}>
            <Text style={[styles.ecoText, { color: theme.text }]}>{ecoTip}</Text>
          </View>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
              onPress={() => router.push('/quiz')}
              style={[styles.ctaButton, { backgroundColor: theme.primary, shadowColor: '#000' }]}
              activeOpacity={0.8}
          >
            <Text style={styles.ctaText}>Démarrer le quiz →</Text>
          </TouchableOpacity>

          <TouchableOpacity
              onPress={() => router.push('/activities')}
              style={[styles.ctaButton, { backgroundColor: theme.primary, shadowColor: '#000' }]}
              activeOpacity={0.8}
          >
            <Text style={styles.ctaText}>Voir l'impacte</Text>
          </TouchableOpacity>

          <TouchableOpacity
          onPress={() => router.push('/more')}
            style={[
              styles.secondaryButton,
              { borderColor: 'transparent' },
            ]}
            activeOpacity={0.7}
          >
            <Text style={[styles.secondaryText, { color: theme.secondaryText }]}>En savoir plus</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={[styles.footer, { color: theme.subtext }]}>
        © 2025 Ecocrisie - Tous droits réservés
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -2,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'space-between',
    maxWidth: 500,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    alignItems: 'center',
    gap: 16,
  },
  logoCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 28,
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitleBox: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 16,
    maxWidth: 360,
  },
  subtitle: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  imageWrapper: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 600,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  buttons: {
    gap: 16,
    alignItems: 'center',
  },
  ctaButton: {
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 100,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  ctaText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 100,
    alignItems: 'center',
  },
  secondaryText: {
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    textAlign: 'center',
    fontSize: 11,
    marginTop: 40,
    opacity: 0.7,
  },
  ecoGuide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    flexWrap: 'wrap',
  },

  ecoEmoji: {
    fontSize: 24,
  },

  ecoBubble: {
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexShrink: 1,
    maxWidth: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  ecoText: {
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 20,
  },
});
