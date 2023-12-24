import { StyleSheet, Text, View, Image, Animated, Easing } from "react-native";
import { useEffect, useRef } from "react";
const LoadingScreen = () => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const scaleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.2,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    );

    scaleAnimation.start();

    return () => {
      scaleAnimation.stop();
    };
  }, [scaleValue]);

  return (
    <View style={styles.loading}>
      <Animated.Image
        source={require("../assets/Logo.png")}
        style={{
          width: 250,
          height: 250,
          transform: [{ scale: scaleValue }],
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  loading: {
    backgroundColor: "#111111",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default LoadingScreen;
