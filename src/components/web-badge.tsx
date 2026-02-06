import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, useColorScheme } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { expoVersion } from '@/constants/react-native-info';
import { useTheme } from '@/hooks/use-theme';

export function WebBadge() {
  const scheme = useColorScheme();
  const theme = useTheme();

  return (
    <Link href="/about" asChild>
      <Pressable>
        {({ focused, pressed, hovered }) => (
          <ThemedView
            className="badge-container badge-pressable"
            style={(focused || pressed || hovered) && { backgroundColor: theme.tint }}
          >
            <ThemedText
              type="code"
              themeColor="textSecondary"
              className="badge-version-text"
              style={(focused || pressed || hovered) && styles.versionTextFocused}
            >
              v{expoVersion}
            </ThemedText>
            <Image
              source={
                scheme === 'dark'
                  ? require('@/assets/images/expo-badge-white.png')
                  : require('@/assets/images/expo-badge.png')
              }
              className="badge-image"
            />
          </ThemedView>
        )}
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  versionTextFocused: {
    color: '#000000',
  },
});
