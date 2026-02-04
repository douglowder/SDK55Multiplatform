import { useScreenDimensions } from '@/hooks/use-screen-dimensions';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, { Easing, Keyframe } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

const INITIAL_SCALE_FACTOR = Dimensions.get('screen').height / 90;
const DURATION = 600;

const splashKeyframe = new Keyframe({
  0: {
    transform: [{ scale: INITIAL_SCALE_FACTOR }],
    opacity: 1,
  },
  20: {
    opacity: 1,
  },
  70: {
    opacity: 0,
    easing: Easing.elastic(0.7),
  },
  100: {
    opacity: 0,
    transform: [{ scale: 1 }],
    easing: Easing.elastic(0.7),
  },
});

export function AnimatedSplashOverlay() {
  const [visible, setVisible] = useState(true);
  const styles = useAnimatedIconStyles();
  if (!visible) return null;

  return (
    <Animated.View
      entering={splashKeyframe.duration(DURATION).withCallback((finished) => {
        'worklet';
        if (finished) {
          scheduleOnRN(setVisible, false);
        }
      })}
      style={styles.backgroundSolidColor}
    />
  );
}

const keyframe = new Keyframe({
  0: {
    transform: [{ scale: INITIAL_SCALE_FACTOR }],
  },
  100: {
    transform: [{ scale: 1 }],
    easing: Easing.elastic(0.7),
  },
});

const logoKeyframe = new Keyframe({
  0: {
    transform: [{ scale: 1.3 }],
    opacity: 0,
  },
  40: {
    transform: [{ scale: 1.3 }],
    opacity: 0,
    easing: Easing.elastic(0.7),
  },
  100: {
    opacity: 1,
    transform: [{ scale: 1 }],
    easing: Easing.elastic(0.7),
  },
});

const glowKeyframe = new Keyframe({
  0: {
    transform: [{ rotateZ: '0deg' }],
  },
  100: {
    transform: [{ rotateZ: '7200deg' }],
  },
});

export function AnimatedIcon() {
  const styles = useAnimatedIconStyles();
  return (
    <View style={styles.iconContainer}>
      <Animated.View
        entering={glowKeyframe.duration(60 * 1000 * 4)}
        style={styles.glow}
      >
        <Image
          style={styles.glow}
          source={require('@/assets/images/logo-glow.png')}
        />
      </Animated.View>

      <Animated.View
        entering={keyframe.duration(DURATION)}
        style={styles.background}
      />
      <Animated.View
        style={styles.imageContainer}
        entering={logoKeyframe.duration(DURATION)}
      >
        <Image
          style={styles.image}
          source={require('@/assets/images/expo-logo.png')}
        />
      </Animated.View>
    </View>
  );
}

const useAnimatedIconStyles = () => {
  const { height } = useScreenDimensions();
  return StyleSheet.create({
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    glow: {
      width: height * 0.15,
      height: height * 0.15,
      position: 'absolute',
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: height * 0.1,
      height: height * 0.1,
      zIndex: 100,
    },
    image: {
      position: 'absolute',
      width: height * 0.1,
      height: height * 0.1,
    },
    background: {
      borderRadius: height * 0.04,
      experimental_backgroundImage: `linear-gradient(180deg, #3C9FFE, #0274DF)`,
      width: height * 0.15,
      height: height * 0.15,
      position: 'absolute',
    },
    backgroundSolidColor: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: '#208AEF',
      zIndex: 1000,
    },
  });
};
