import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { getCryptoList } from '@/components/List';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from "@/components/ThemedView";
import {CryptoImage} from '@/components/CryptoImage';

interface Crypto {
  name: string;
  png32: string;
}
export default function HomeScreen() {
  const [cryptoList, setCryptoList] = useState<Crypto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCryptoList = async () => {
      try {
        setIsLoading(true);
        const data = await getCryptoList();
        setCryptoList(data);
      } catch (error) {
        console.error('Errore nel caricamento della lista crypto:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCryptoList();
  }, []);

  const renderItem = ({ item }: { item: Crypto }) => (
      <ThemedView style={styles.cryptoItem}>
        <CryptoImage url={item.png32} />
        <ThemedText style={styles.cryptoName}>{item.name}</ThemedText>
      </ThemedView>
  );

  if (isLoading) {
    return (
        <ThemedView style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </ThemedView>
    );
  }

  return (
      <ParallaxScrollView
          headerBackgroundColor={{ light: '#A1CEDC', dark: '#7132f5' }}
          headerImage={
            <Image
                source={require('@/assets/images/partial-crypto.logo-png.png')}
                style={styles.reactLogo}
            />
          }>
        <FlatList
            data={cryptoList}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            contentContainerStyle={styles.listContainer}
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            windowSize={5}
        />
      </ParallaxScrollView>
  );
}

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