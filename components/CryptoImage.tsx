import React, {useState} from "react";
import {ThemedView} from "@/components/ThemedView";
import {ActivityIndicator, Image, StyleSheet} from "react-native";

export const CryptoImage = ({ url }: { url: string }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <ThemedView>
            {isLoading && (
                <ActivityIndicator
                    style={StyleSheet.absoluteFill}
                    size="small"
                />
            )}
            <Image
                source={{ uri: url }}
                style={styles.cryptoIcon}
                onLoadStart={() => setIsLoading(true)}
                onLoadEnd={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
            />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cryptoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    cryptoIcon: {
        width: 32,
        height: 32,
        marginRight: 12,
    },
    cryptoName: {
        fontSize: 16,
        flex: 1,
    },
    listContainer: {
        paddingHorizontal: 16,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});