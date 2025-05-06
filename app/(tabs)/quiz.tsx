import { quotes } from '@/app/constants/quotes';
import { getTheme } from '@/app/constants/theme';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Platform,
    SafeAreaView,
    Share,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import fullQuizData from '../../assets/json/quiz.json';

export default function QuizScreen() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showExplanation, setShowExplanation] = useState(false);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const isDark = useColorScheme() === 'dark';
    const theme = getTheme(isDark);
    const router = useRouter();

    const fadeAnim = useRef(new Animated.Value(0)).current;

    // → Shuffle and pick 5 questions when component mounts
    useEffect(() => {
        const shuffled = [...fullQuizData].sort(() => 0.5 - Math.random());
        setQuestions(shuffled.slice(0, 5));
        resetState();
    }, []);

    // → Fade-in animation when explanation appears
    useEffect(() => {
        if (showExplanation) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        } else {
            fadeAnim.setValue(0);
        }
    }, [showExplanation]);

    const resetState = () => {
        setCurrentQuestion(0);
        setShowExplanation(false);
        setSelected(null);
        setScore(0);
        setShowConfetti(false);
    };

    const handleShare = async (score: number) => {
      const quote = quotes[Math.floor(Math.random() * quotes.length)];
      const message = `${quote}\n\nJ'ai obtenu ${score}/5 au quiz Écocrisie 🌱\nEt toi ? ➡️ https://ecocrisie.app`;

      if (Platform.OS === 'web') {
        try {
          await navigator.clipboard.writeText(message);
          alert('Texte copié dans le presse-papier 📋');
        } catch (err) {
          alert('Échec de la copie dans le presse-papier.');
        }
      } else {
        try {
          await Share.share({ message });
        } catch (error: any) {
          Alert.alert('Erreur lors du partage', error.message);
        }
      }
    };

    const handleAnswer = (option: React.SetStateAction<null>) => {
        setSelected(option);
        setShowExplanation(true);
        if (option === questions[currentQuestion].answer) {
            setScore((s) => s + 1);
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 1500);
        }
    };

    const nextQuestion = () => {
        if (currentQuestion + 1 >= 5) {
            const finalScore = score + (selected === questions[currentQuestion].answer ? 1 : 0);
            Alert.alert(
                'Quiz terminé',
                `Vous avez obtenu ${finalScore}/5 réponses correctes.`,
                [
                    {
                        text: 'Partager mes résultats',
                        onPress: () => handleShare(finalScore),
                    },
                    {
                        text: 'Rejouer',
                        onPress: () => {
                            const reshuffled = [...fullQuizData].sort(() => 0.5 - Math.random());
                            setQuestions(reshuffled.slice(0, 5));
                            resetState();
                        },
                    },
                    { text: 'Retour à l’accueil', onPress: () => router.replace('/') },
                ]
            );
        } else {
            setCurrentQuestion((q) => q + 1);
            setSelected(null);
            setShowExplanation(false);
        }
    };

    const handleBack = () => {
        Alert.alert(
            'Quitter le quiz',
            'Voulez-vous quitter le quiz ? Votre progression sera perdue.',
            [
                { text: 'Annuler', style: 'cancel' },
                {
                    text: 'Quitter',
                    style: 'destructive',
                    onPress: () => {
                        resetState();
                        router.replace('/');
                    },
                },
            ]
        );
    };

    if (questions.length === 0) return null;
    const question = questions[currentQuestion];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundEnd }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack}>
                    <Text style={[styles.backButton, { color: theme.text }]}>←</Text>
                </TouchableOpacity>
                <Text style={[styles.score, { color: theme.text }]}>Score : {score}/5</Text>
            </View>

            <View style={styles.content}>
                <Text style={[styles.questionText, { color: theme.text }]}>
                    {question.question}
                </Text>

                {question.options.map((option: string | number | bigint | boolean | React.SetStateAction<null> | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | undefined, index: React.Key | null | undefined) => {
                    const isCorrect = option === question.answer;
                    const isSelected = selected === option;

                    let backgroundColor = theme.card;
                    if (showExplanation && isSelected) {
                        backgroundColor = isCorrect ? theme.correct : theme.incorrect;
                    }

                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleAnswer(option)}
                            disabled={showExplanation}
                            style={[styles.optionButton, { backgroundColor, borderColor: theme.border }]}
                        >
                            <Text style={{ color: theme.text }}>{option}</Text>
                        </TouchableOpacity>
                    );
                })}

                {showExplanation && (
                    <Animated.View style={[styles.explanationBox, { opacity: fadeAnim }]}>
                        <Text style={[styles.explanationText, { color: theme.text }]}>
                            {selected === question.answer ? '✅ Bonne réponse ! ' : '❌ Mauvaise réponse. '}
                            {question.explanation}
                        </Text>

                        <TouchableOpacity
                            onPress={nextQuestion}
                            style={[styles.nextButton, { backgroundColor: theme.primary }]}
                        >
                            <Text style={styles.nextText}>Question suivante →</Text>
                        </TouchableOpacity>
                    </Animated.View>
                )}
            </View>

            {showConfetti && <ConfettiCannon count={100} origin={{ x: 50, y: 10 }} fallSpeed={1500} fadeOut />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    backButton: {
        fontSize: 28,
    },
    score: {
        fontStyle : 'italic',
        fontSize: 18,
        fontWeight: '500',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        gap: 16,
        paddingHorizontal: 16,
    },
    questionText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    optionButton: {
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 16,
        borderWidth: 1,
    },
    explanationBox: {
        marginTop: 24,
        gap: 12,
    },
    explanationText: {
        fontSize: 16,
        lineHeight: 22,
    },
    nextButton: {
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 100,
        alignItems: 'center',
        alignSelf: 'center',
    },
    nextText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});