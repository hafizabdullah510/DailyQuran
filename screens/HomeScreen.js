import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Animated,
  Easing,
} from "react-native";
import { Navbar, DayOfWeek, Goal, QuranReadInfo } from "../components";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { useEffect, useRef } from "react";
import { useAPIContext } from "../context/APIcontext";
import { useAppContext } from "../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
const HomeScreen = ({ navigation }) => {
  const { setUserState, setCanRun, userState } = useAppContext();
  const scaleValue = useRef(new Animated.Value(1)).current;
  const { queryQuranData, loading, combineQuranData, quranDataLoading } =
    useAPIContext();
  useEffect(() => {
    queryQuranData();
  }, [quranDataLoading]);
  useEffect(() => {
    AsyncStorage.getItem("userState")
      .then((state) => {
        if (state) {
          setUserState(JSON.parse(state));
        } else {
          AsyncStorage.setItem("userState", JSON.stringify(userState));
        }
      })
      .then(() => {
        setCanRun(true);
      })
      .catch((err) => console.log(err));
  }, []);
  // useEffect(() => {
  //   AsyncStorage.setItem("userState", JSON.stringify(userState))
  //     .then(console.log("all set"))
  //     .catch((err) => console.log(err));
  // }, []);
  // useEffect(() => {
  //   AsyncStorage.removeItem("userState")
  //     .then(console.log("ok"))
  //     .catch((err) => console.log(err));
  // }, []);
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
  if (loading || combineQuranData.length === 0) {
    return (
      <View style={styles.loading}>
        <StatusBar hidden />
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
  }
  const headerComponent = () => {
    return (
      <View style={{ width: "100%", alignItems: "center" }}>
        <Navbar />
        <DayOfWeek />
        <Goal navigation={navigation} quran={combineQuranData} />
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar hidden />
      <QuranReadInfo HeaderComponent={headerComponent} />
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  loading: {
    backgroundColor: "#111111",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "#101010",
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 250,
  },
  fetchText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 24,
  },
});
export default HomeScreen;
