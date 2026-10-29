import React, { useEffect, useState } from 'react';
import { Animated, Platform } from 'react-native';

export default function FadeIn({ children, duration = 500, style, ...props }) {
  const [opacity] = useState(() => new Animated.Value(0));

  useEffect(() => {
    const animation = Animated.timing(opacity, {
      toValue: 1,
      duration,
      useNativeDriver: Platform.OS !== 'web',
    });
    animation.start();

    return () => animation.stop();
  }, [duration, opacity]);

  return (
    <Animated.View style={[style, { opacity }]} {...props}>
      {children}
    </Animated.View>
  );
}
