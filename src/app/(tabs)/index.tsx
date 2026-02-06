import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedIcon } from '@/components/animated-icon';
import { HintRow } from '@/components/hint-row';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';

export default function HomeScreen() {
  return (
    <ThemedView className="home-container">
      <SafeAreaView className="home-safe-area">
        <ThemedView className="home-hero">
          <AnimatedIcon />
          <ThemedView className="home-title-container">
            <ThemedText type="title" className="home-title">
              Welcome to&nbsp;Expo
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedText type="code" className="home-code">
          get started
        </ThemedText>

        <ThemedView type="backgroundElement" className="home-step-container">
          <HintRow title="Try editing" hint="src/app/(tabs)/index.tsx" />
          <HintRow title="Dev tools" hint="cmd+d" />
          <HintRow title="Fresh start" hint="npm reset project" />
        </ThemedView>

        <WebBadge />
      </SafeAreaView>
    </ThemedView>
  );
}
