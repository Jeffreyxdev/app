import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet, Dimensions, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Splash = ({ onFinish }: { onFinish?: () => void }) => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  
  // Animation values
  const logoScale = useRef(new Animated.Value(1.5)).current; // Start larger
  const logoTranslateX = useRef(new Animated.Value(0)).current; // Center initially
  const logoTranslateY = useRef(new Animated.Value(0)).current; // Center initially
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateX = useRef(new Animated.Value(0)).current; // Start at center
  
  // Calculate responsive dimensions
  const finalLogoSize = Math.min(width, height) * 0.255; // Final size
  const initialLogoSize = Math.min(width, height) * 0.35; // Initial size
  const fontSize = width * 0.1; // 10% of screen width for text
  const spacing = width * 0.02; // Space between logo and text

  // Calculate the total width of logo + text when side by side
  const totalContentWidth = finalLogoSize + spacing + (fontSize * 6); // Approximate text width (6 chars)
  
  // Calculate offsets to keep everything centered
  const logoFinalX = -totalContentWidth / 2 + finalLogoSize / 1;
  const textFinalX = -totalContentWidth / 2 + finalLogoSize + spacing + (fontSize * 2.5); // Center of text

  useEffect(() => {
    // Animation sequence
    Animated.sequence([
      // Step 1: Show big logo in center for a moment
      Animated.delay(1500),
      
      // Step 2: Scale down logo and move it to the left while fading in text
      Animated.parallel([
        // Scale down the logo
        Animated.spring(logoScale, {
          toValue: finalLogoSize / initialLogoSize, // Scale ratio to get to final size
          tension: 40,
          friction: 7,
          useNativeDriver: true,
        }),
        
        // Move logo to its final position (left side of center)
        Animated.timing(logoTranslateX, {
          toValue: logoFinalX,
          duration: 600,
          useNativeDriver: true,
        }),
        
        // Fade in the text
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 600,
          delay: 300, // Slight delay so text appears after logo starts moving
          useNativeDriver: true,
        }),
        
        // Position text to the right of logo
        Animated.timing(textTranslateX, {
          toValue: textFinalX,
          duration: 600,
          delay: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      // Optional: navigate away after animation completes
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 2000);
    });
  }, [width, height]);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.content}>
        {/* Logo - starts big and centered */}
        <Animated.Image
          source={require("../assets/images/icon.png")}
          style={[
            styles.logo,
            {
              width: initialLogoSize,
              height: initialLogoSize,
              position: 'absolute',
              transform: [
                { scale: logoScale },
                { translateX: logoTranslateX },
                { translateY: logoTranslateY },
              ],
            },
          ]}
          resizeMode="contain"
        />

        {/* Text - fades in after logo scales down */}
        <Animated.Text
          style={[
            styles.text,
            {
              fontSize,
              position: 'absolute',
              opacity: textOpacity,
              transform: [{ translateX: textTranslateX }],
            },
          ]}
        >
          Suiver
        </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: 'relative',
  },
  logo: {
    aspectRatio: 1,
  },
  text: {
    fontWeight: "700",
    color: "#fff",
    fontFamily: "Monsterrat-bold",
  },
});

export default Splash;

