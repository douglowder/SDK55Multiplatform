import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { EventHandlingDemo } from '@/components/tv-event-demo';
// import { TVFocusGuideView } from '@/components/tv-focus-guide';
import { Collapsible } from '@/components/ui/collapsible';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function FocusDemoScreen() {
  const theme = useTheme();
  const contentPlatformStyle = {
    paddingTop: Spacing.six + Spacing.four,
    paddingBottom: Spacing.four,
  };

  return (
    <ThemedView
      className="focus-demo-container"
      style={[contentPlatformStyle, { backgroundColor: theme.background }]}
    >
      <ThemedView className="focus-demo-inner">
        <ThemedView className="focus-demo-title-container">
          <ThemedText type="subtitle">TV event handling demo</ThemedText>
        </ThemedView>
        <ThemedText>
          Demo of focus handling and TV remote event handling in{' '}
          <ThemedText type="code">Pressable</ThemedText> and{' '}
          <ThemedText type="code">Touchable</ThemedText> components.
        </ThemedText>
        <Collapsible title="How it works" style={styles.fullWidth}>
          <ThemedText>
            • On TV platforms, these components have {'"'}onFocus(){'"'} and{' '}
            {'"'}onBlur(){'"'} props, in addition to the usual {'"'}onPress()
            {'"'}. These can be used to modify the style of the component when
            it is navigated to or navigated away from by the TV focus engine.
          </ThemedText>
          <ThemedText>
            • On web, Pressable has the above handlers, and also has {'"'}
            onHoverIn(){'"'}, and {'"'}onHoverOut(){'"'} props.
          </ThemedText>
          <ThemedText>
            • In addition, the functional forms of the Pressable style prop and
            the Pressable content, which in React Native core take a {'"'}
            pressed{'"'} boolean parameter, can also take {'"'}focused{'"'} as a
            parameter on TV platforms, and {'"'}hovered{'"'} as a parameter on
            web.
          </ThemedText>
          <ThemedText>
            • As you use the arrow keys to navigate around the screen, the demo
            uses the above props to update lists of recent events.
          </ThemedText>
          <ThemedText>
            In RNTV 0.76 and above, `Pressable` and `Touchable` components
            receive {'"'}focus{'"'}, {'"'}blur{'"'}, {'"'}pressIn{'"'}, and{' '}
            {'"'}pressOut{'"'} events directly from native code, for improved
            performance when navigating around the screen.
          </ThemedText>
        </Collapsible>
      </ThemedView>
      <EventHandlingDemo />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
});
