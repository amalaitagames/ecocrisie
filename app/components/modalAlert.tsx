import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Platform } from 'react-native';

type Props = {
    visible: boolean;
    title: string;
    message: string;
    buttons: { text: string; onPress: () => void; style?: 'default' | 'cancel' | 'destructive' }[];
    onClose: () => void;
};

export default function ModalAlert({ visible, title, message, buttons, onClose }: Props) {
    if (Platform.OS !== 'web') return null;

    return (
        <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>
                    <View style={styles.buttons}>
                        {buttons.map((btn, i) => (
                            <TouchableOpacity
                                key={i}
                                onPress={btn.onPress}
                                style={[
                                    styles.button,
                                    btn.style === 'destructive' && { backgroundColor: '#f87171' },
                                    btn.style === 'cancel' && { backgroundColor: '#9ca3af' },
                                ]}
                            >
                                <Text style={styles.buttonText}>{btn.text}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: 'white',
        padding: 24,
        borderRadius: 16,
        width: '90%',
        maxWidth: 500,
    },
    title: {
        fontWeight: '700',
        fontSize: 18,
        marginBottom: 12,
    },
    message: {
        fontSize: 15,
        marginBottom: 20,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: '#10b981',
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
    },
});