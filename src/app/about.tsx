import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { expoVersion, rnVersion } from '@/constants/react-native-info';
import { useTheme } from '@/hooks/use-theme';

function PackageInfo({ name, version }: { name: string; version: string }) {
  return (
    <ThemedView className="about-package-info">
      <ThemedText type="small">{name}</ThemedText>
      <View style={styles.flex} />
      <ThemedText type="smallBold">{version}</ThemedText>
    </ThemedView>
  );
}

export default function AboutScreen() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <ThemedView
      type="backgroundElement"
      className="about-container"
    >
      <ThemedText type="subtitle">About</ThemedText>
      <ThemedText>This is a demo Expo Router app with TV support.</ThemedText>
      <PackageInfo name="Expo" version={expoVersion} />
      <PackageInfo name="React Native TV" version={rnVersion} />
      <Pressable
        onPress={() => {
          if (router.canDismiss()) {
            console.log('Dismiss');
            router.dismiss();
          } else if (router.canGoBack()) {
            console.log('Back');
            router.back();
          } else {
            console.log('Navigate');
            router.navigate('/');
          }
        }}
      >
        {({ focused, hovered, pressed }) => (
          <ThemedView
            className="about-dismiss-button"
            style={(pressed || focused || hovered) && { backgroundColor: theme.tint }}
          >
            <ThemedText
              type="link"
              style={
                (focused || pressed || hovered) && { color: theme.background }
              }
            >
              Dismiss
            </ThemedText>
          </ThemedView>
        )}
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
