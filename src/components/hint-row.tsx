import React from 'react';
import { View } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

type HintRowProps = {
  title?: string;
  hint?: string;
};

export function HintRow({
  title = 'Try editing',
  hint = 'app/index.tsx',
}: HintRowProps) {
  return (
    <View className="hint-row">
      <ThemedText type="small">{title}</ThemedText>
      <ThemedView type="backgroundSelected" className="hint-code-snippet">
        <ThemedText themeColor="textSecondary" type="code">
          {hint}
        </ThemedText>
      </ThemedView>
    </View>
  );
}
