import { SymbolView } from 'expo-symbols';
import { PropsWithChildren, useState } from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function Collapsible({
  children,
  title,
  style,
}: PropsWithChildren & { title: string; style?: ViewStyle }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  return (
    <ThemedView style={style ?? {}}>
      <Pressable
        style={({ pressed, focused }) => [
          styles.heading,
          pressed && styles.pressedHeading,
          focused && { backgroundColor: theme.backgroundSelected },
        ]}
        onPress={() => setIsOpen((value) => !value)}
      >
        <ThemedView type="backgroundElement" className="collapsible-button">
          <SymbolView
            name={{
              ios: 'chevron.right',
              android: 'chevron_right',
              web: 'chevron_right',
            }}
            size={14}
            weight="bold"
            tintColor={theme.text}
            style={{ transform: [{ rotate: isOpen ? '-90deg' : '90deg' }] }}
          />
        </ThemedView>

        <ThemedText type="small">{title}</ThemedText>
      </Pressable>
      {isOpen && (
        <Animated.View entering={FadeIn.duration(200)}>
          <ThemedView type="backgroundElement" className="collapsible-content">
            {children}
          </ThemedView>
        </Animated.View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: Spacing.two,
    borderRadius: Spacing.three,
  },
  pressedHeading: {
    opacity: 0.7,
  },
});
