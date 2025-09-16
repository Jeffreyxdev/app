import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  StyleSheet,
} from "react-native";
import { OnboardingData } from "@/constants/onboarding";
import { Ionicons } from "@expo/vector-icons";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// BubbleProps interface (you might need to add this if it's not defined elsewhere)
interface BubbleProps {
  color: string;
  size: number;
  delay: number;
  startX: number;
  startY: number;
}

// Floating bubble component
const FloatingBubble = ({
  color,
  size,
  delay,
  startX,
  startY,
}: BubbleProps) => {
  const animatedY = useRef(new Animated.Value(startY)).current;
  const animatedX = useRef(new Animated.Value(startX)).current;
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // Calculate safe boundaries to prevent edge glitching
    const maxX = SCREEN_WIDTH - size;
    const maxY = SCREEN_HEIGHT - size;
    const minX = 0;
    const minY = 0;

    // Constrain movement within safe boundaries
    const safeStartX = Math.max(minX + 30, Math.min(startX, maxX - 30));
    const safeStartY = Math.max(minY + 30, Math.min(startY, maxY - 30));

    const moveRangeX = 15; // Reduced movement range
    const moveRangeY = 25; // Reduced movement range

    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(animatedY, {
            toValue: Math.max(minY, safeStartY - moveRangeY),
            duration: 3000,
            useNativeDriver: true,
            delay,
          }),
          Animated.timing(animatedY, {
            toValue: Math.min(maxY, safeStartY + moveRangeY),
            duration: 3000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(animatedX, {
            toValue: Math.min(maxX, safeStartX + moveRangeX),
            duration: 4000,
            useNativeDriver: true,
            delay,
          }),
          Animated.timing(animatedX, {
            toValue: Math.max(minX, safeStartX - moveRangeX),
            duration: 4000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.8,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.4,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 1,
        borderColor: color,
        backgroundColor: color + "30", // Semi-transparent background using the actual color
        opacity,
        transform: [{ translateX: animatedX }, { translateY: animatedY }],
      }}
    />
  );
};

const Welcome = () => {
  const [page, setPage] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Generate fixed positions for consistent bubble placement with boundary constraints
  const generateBubbleConfig = () => [
    // Page 1
    [
      {
        color: "#3B82F6",
        size: 24,
        delay: 0,
        startX: SCREEN_WIDTH * 0.2,
        startY: SCREEN_HEIGHT * 0.25,
      },
      {
        color: "#F59E0B",
        size: 20,
        delay: 500,
        startX: SCREEN_WIDTH * 0.7,
        startY: SCREEN_HEIGHT * 0.2,
      },
      {
        color: "#EC4899",
        size: 18,
        delay: 1000,
        startX: SCREEN_WIDTH * 0.15,
        startY: SCREEN_HEIGHT * 0.65,
      },
      {
        color: "#10B981",
        size: 22,
        delay: 1500,
        startX: SCREEN_WIDTH * 0.65,
        startY: SCREEN_HEIGHT * 0.7,
      },
      {
        color: "#8B5CF6",
        size: 26,
        delay: 2000,
        startX: SCREEN_WIDTH * 0.4,
        startY: SCREEN_HEIGHT * 0.45,
      },
    ],
    // Page 2
    [
      {
        color: "#8B5CF6",
        size: 22,
        delay: 0,
        startX: SCREEN_WIDTH * 0.25,
        startY: SCREEN_HEIGHT * 0.3,
      },
      {
        color: "#EC4899",
        size: 18,
        delay: 800,
        startX: SCREEN_WIDTH * 0.75,
        startY: SCREEN_HEIGHT * 0.35,
      },
      {
        color: "#F59E0B",
        size: 20,
        delay: 400,
        startX: SCREEN_WIDTH * 0.2,
        startY: SCREEN_HEIGHT * 0.6,
      },
      {
        color: "#3B82F6",
        size: 24,
        delay: 1200,
        startX: SCREEN_WIDTH * 0.7,
        startY: SCREEN_HEIGHT * 0.65,
      },
      {
        color: "#10B981",
        size: 26,
        delay: 1600,
        startX: SCREEN_WIDTH * 0.45,
        startY: SCREEN_HEIGHT * 0.25,
      },
    ],
    // Page 3
    [
      {
        color: "#10B981",
        size: 20,
        delay: 200,
        startX: SCREEN_WIDTH * 0.18,
        startY: SCREEN_HEIGHT * 0.22,
      },
      {
        color: "#8B5CF6",
        size: 22,
        delay: 600,
        startX: SCREEN_WIDTH * 0.68,
        startY: SCREEN_HEIGHT * 0.28,
      },
      {
        color: "#EC4899",
        size: 18,
        delay: 1000,
        startX: SCREEN_WIDTH * 0.22,
        startY: SCREEN_HEIGHT * 0.68,
      },
      {
        color: "#F59E0B",
        size: 24,
        delay: 1400,
        startX: SCREEN_WIDTH * 0.62,
        startY: SCREEN_HEIGHT * 0.72,
      },
      {
        color: "#3B82F6",
        size: 26,
        delay: 1800,
        startX: SCREEN_WIDTH * 0.42,
        startY: SCREEN_HEIGHT * 0.5,
      },
    ],
    // Page 4
    [
      {
        color: "#3B82F6",
        size: 22,
        delay: 300,
        startX: SCREEN_WIDTH * 0.25,
        startY: SCREEN_HEIGHT * 0.2,
      },
      {
        color: "#10B981",
        size: 20,
        delay: 700,
        startX: SCREEN_WIDTH * 0.72,
        startY: SCREEN_HEIGHT * 0.32,
      },
      {
        color: "#8B5CF6",
        size: 18,
        delay: 1100,
        startX: SCREEN_WIDTH * 0.18,
        startY: SCREEN_HEIGHT * 0.62,
      },
      {
        color: "#EC4899",
        size: 24,
        delay: 1500,
        startX: SCREEN_WIDTH * 0.68,
        startY: SCREEN_HEIGHT * 0.75,
      },
      {
        color: "#F59E0B",
        size: 26,
        delay: 1900,
        startX: SCREEN_WIDTH * 0.38,
        startY: SCREEN_HEIGHT * 0.42,
      },
    ],
  ];

  const bubbleConfigs = generateBubbleConfig();

  const handleNext = () => {
    if (page < OnboardingData.length - 1) {
      animateTransition(() => setPage(page + 1));
    } else {
      console.log("onboarding finished");
      // Navigate to next screen or complete onboarding
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      animateTransition(() => setPage(page - 1));
    }
  };

  const animateTransition = (callback: () => void) => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -50,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      callback();
      slideAnim.setValue(50);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const currentOnboarding = OnboardingData[page];

  return (
    <SafeAreaView style={styles.container}>
      {/* Skip button */}
      {page < OnboardingData.length - 1 && (
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => setPage(OnboardingData.length - 1)}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      <View style={styles.content}>
        {/* Floating bubbles */}
        {bubbleConfigs[page]?.map((config, index) => (
          <FloatingBubble key={`bubble-${page}-${index}`} {...config} />
        ))}

        {/* Main content */}
        <Animated.View
          style={[
            styles.animatedContent,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Image */}
          <View style={styles.imageContainer}>
            <Image
              source={currentOnboarding.image}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          {/* Title */}
          <Text style={styles.title}>{currentOnboarding.title}</Text>

          {/* Description */}
          <Text style={styles.description}>
            {currentOnboarding.description}
          </Text>
        </Animated.View>

        {/* Navigation */}
        <View style={styles.navigationContainer}>
          {/* Arrow button */}
          <TouchableOpacity
            onPress={handleNext}
            style={styles.arrowButton}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-forward" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  skipButton: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  skipText: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
    justifyContent: "space-between",
  },
  animatedContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1, 
  },
  imageContainer: {
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_HEIGHT * 0.35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    zIndex: 1, 
  },
  progressContainer: {
    flexDirection: "row",
    flex: 1,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  progressDotActive: {
    backgroundColor: "#111827",
    width: 32,
  },
  progressDotInactive: {
    backgroundColor: "#E5E7EB",
  },
  arrowButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default Welcome;