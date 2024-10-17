import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme,Alert } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

export function CameraQR() {
    const [isCameraOpen, setIsCameraOpen] = useState(true);
    const openCamera = () => {
        setIsCameraOpen(true);
    };
    const onQRCodeRead = (e: { data: string }) => {
        Alert.alert('QR Code Scanned', `Scanned data: ${e.data}`);
        setIsCameraOpen(false);
    };
    return (
        <ThemedView style={styles.heading}>
            {!isCameraOpen ? (
                <TouchableOpacity onPress={openCamera} style={styles.iconContainer}>
                    <FontAwesome5 name="qrcode" size={40} color="#fff" />
                    <ThemedText>Tap to scan QR Code</ThemedText>
                </TouchableOpacity>
            ):(
                <QRCodeScanner
                    onRead={onQRCodeRead}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                    topContent={<ThemedText>Point your camera at a QR code</ThemedText>}
                    bottomContent={
                        <TouchableOpacity style={styles.buttonTouchable} onPress={() => setIsCameraOpen(false)}>
                            <ThemedText>Cancel</ThemedText>
                        </TouchableOpacity>
                    }
                />
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    heading: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
    },
    content: {
        marginTop: 6,
    },
    buttonTouchable: {
        padding: 16,
        backgroundColor: '#282c34',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});