import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    useColorScheme,
    Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import ConfettiCannon from 'react-native-confetti-cannon';
import quizData from '../../assets/json/quiz.json';
import {getTheme} from "@/app/constants/theme";

export default function QuizScreen() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showExplanation, setShowExplanation] = useState(false);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const isDark = useColorScheme() === 'dark';
    const theme = getTheme(isDark);
    const router = useRouter();
    const question = quizData[currentQuestion];

    const handleAnswer = (option: string | React.SetStateAction<null>) => {
        // @ts-ignore
        setSelected(option);
        setShowExplanation(true);
        if (option === question.answer) {
            setScore((s) => s + 1);
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 2000);
        }
    };

    const nextQuestion = () => {
        setSelected(null);
        setShowExplanation(false);
        if (currentQuestion + 1 >= 5 || currentQuestion + 1 >= quizData.length) {
            Alert.alert('Quiz terminé', `Vous avez obtenu ${score}/5 réponses correctes.`, [
                { text: 'Retour à l’accueil', onPress: () => router.replace('/') },
            ]);
        } else {
            setCurrentQuestion((q) => q + 1);
        }
    };

    const handleBack = () => {
        Alert.alert(
            'Quitter le quiz',
            'Êtes-vous sûr de vouloir quitter le quiz ? Votre progression sera perdue.',
            [
                { text: 'Annuler', style: 'cancel' },
                { text: 'Quitter', style: 'destructive', onPress: () => router.replace('/') },
            ]
        );
    };

    if (!question) return null;

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

                {question.options.map((option, index) => {
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
                    <View style={styles.explanationBox}>
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
                    </View>
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
        fontSize: 18,
        fontWeight: '500',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        gap: 16,
        paddingHorizontal: 16
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