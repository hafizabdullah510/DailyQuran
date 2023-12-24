import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAPIContext } from "../context/APIcontext";
import { useAppContext } from "../context/AppContext";
import {
  ReadHeader,
  ReadProgressContainer,
  AyatContainer,
  TranslationContainer,
  ReadPageFooter,
} from "../components";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

const QuranReadScreen = ({ navigation, route }) => {
  const {
    loading,
    combineQuranData,
    fontLoaded,
    handlePresentModal,
    bottomSheetModalRef,
    snapPoints,
    tafsir,
  } = useAPIContext();
  const { tafsirInfo } = useAppContext();
  //time
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    let interval;
    const startTime = new Date().getTime(); // Get the current time when the screen mounts

    const updateTimeSpent = () => {
      const currentTime = new Date().getTime();
      const elapsedTime = Math.floor((currentTime - startTime) / 1000); // Calculate elapsed time in seconds
      setTimeSpent(elapsedTime);
    };

    // Update time spent every second
    interval = setInterval(updateTimeSpent, 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []); // Run this effect only once on mount

  const minutes = Math.floor(timeSpent / 60);
  const seconds = timeSpent % 60;

  // Format minutes and seconds to display as "01:30"
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  if (!fontLoaded) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }
  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView
        style={{ width: "90%" }}
        contentContainerStyle={{
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <ReadHeader
          navigation={navigation}
          formattedTime={formattedTime}
          timeSpent={timeSpent}
        />
        <ReadProgressContainer
          quranData={combineQuranData}
          params={
            route.params
              ? { chapter: route.params.chapter, verse: route.params.verse }
              : null
          }
        />
        <AyatContainer
          data={combineQuranData}
          handlePresentModal={handlePresentModal}
          loading={loading}
          params={
            route.params
              ? { chapter: route.params.chapter, verse: route.params.verse }
              : null
          }
        />
        <TranslationContainer
          loading={loading}
          quranData={combineQuranData}
          params={
            route.params
              ? { chapter: route.params.chapter, verse: route.params.verse }
              : null
          }
        />
      </ScrollView>
      <ReadPageFooter
        quranData={combineQuranData}
        timeSpent={timeSpent}
        params={
          route.params
            ? { chapter: route.params.chapter, verse: route.params.verse }
            : null
        }
      />
      <BottomSheetModal
        bottomInset={0}
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: "#202020" }}
      >
        <BottomSheetScrollView style={styles.contentContainer}>
          <View style={styles.tafsirHeader}>
            <Text style={[styles.text, { fontWeight: 500 }]}>
              {tafsirInfo.author}
            </Text>
            <Text style={styles.text}>{tafsirInfo.name}</Text>
          </View>
          <Text style={styles.tafsirText}>{tafsir}</Text>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101010",
    alignItems: "center",
  },
  tafsirText: {
    color: "#fff",
    lineHeight: 50,
    fontSize: 24,
    textAlign: "right",
    padding: 10,
    fontFamily: "urdu-font",
  },
  text: {
    textAlign: "center",
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});
export default QuranReadScreen;
