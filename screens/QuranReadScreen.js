import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  ReadHeader,
  ReadProgressContainer,
  AyatContainer,
  TranslationContainer,
  ReadPageFooter,
} from "../components";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

const QuranReadScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [quranData, setQuranData] = useState([]);
  const [quranTranslation, setQuranTranslation] = useState([]);
  const [readingState, setReadingState] = useState({
    ayah_index: 0,
    current_verse_number: 1,
    recitation_id: 10,
    chapter_number: 1,
    ayah_index_read: 0,
    chapter_read: 1,
    verse_read: 1,
  });
  const [chapterData, setChapterData] = useState([]);
  const [previousChapterVerseCount, setPreviousChapterVerseCount] = useState(0);
  const [tafsir, setTafsir] = useState({});
  const [juzData, setJuzData] = useState({
    juz_number: 1,
    total_Juz_verses: 148,
  });
  const getQuranData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api.quran.com/api/v4/quran/verses/uthmani"
      );
      const data = await response.data;
      setQuranData(data.verses);

      const translationDataResponse = await axios.get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/urd-muhammadtaqiusm.json`
      );
      const translationData = await translationDataResponse.data;
      setQuranTranslation(translationData.quran);
    } catch (error) {
      console.log(error);
    }
  };

  const getChapterData = async () => {
    try {
      const response = await axios.get(
        `https://api.quran.com/api/v4/chapters/${readingState.chapter_number}`
      );
      const previousChapterDataResponse = await axios.get(
        `https://api.quran.com/api/v4/chapters/${
          readingState.chapter_number > 1
            ? readingState.chapter_number - 1
            : 114
        }`
      );
      const data = await response.data;
      const previousChapterData = await previousChapterDataResponse.data;
      setChapterData(data.chapter);
      setPreviousChapterVerseCount(previousChapterData.chapter.verses_count);
    } catch (error) {
      console.log(error);
    }
  };

  const getReaderState = async () => {
    const jsonValue = await AsyncStorage.getItem("readerState");
    const data = JSON.parse(jsonValue);
    if (data) {
      console.log(data);
      setReadingState({
        ...readingState,
        ayah_index_read: data.ayah_index_read,
        chapter_read: data.chapter_read,
        verse_read: data.verse_read,
        ayah_index: data.ayah_index_read,
        chapter_number: data.chapter_read,
        current_verse_number: data.verse_read,
      });
    }
    // await AsyncStorage.removeItem("readerState");
  };
  useEffect(() => {
    getChapterData();
  }, [readingState.chapter_number]);

  useEffect(() => {
    getQuranData()
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getReaderState();
  }, []);

  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = ["60%"];

  const handlePresentModal = () => {
    bottomSheetModalRef.current?.present();
  };
  console.log(chapterData);

  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        "arabic-font": require("../assets/fonts/noto-naskh-arabic-ui-regular-full-org.ttf"),
        "urdu-font": require("../assets/fonts/NotoNastaliqUrdu-Medium.ttf"),
      });

      setFontLoaded(true);
    }

    loadFont();
  }, []);

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView
        alwaysBounceVertical={false}
        contentContainerStyle={{
          alignItems: "center",
          flex: 1,
        }}
      >
        <ReadHeader navigation={navigation} />
        <ReadProgressContainer data={juzData} />
        <AyatContainer
          data={quranData}
          surahData={chapterData}
          readingState={readingState}
          setTafsir={setTafsir}
          handlePresentModal={handlePresentModal}
          loading={loading}
        />
        <TranslationContainer
          loading={loading}
          quranTranslationData={quranTranslation}
          readingState={readingState}
        />
        <ReadPageFooter
          readingState={readingState}
          setReadingState={setReadingState}
          surahData={chapterData}
          previousSurahVersesCount={previousChapterVerseCount}
        />
        <BottomSheetModalProvider>
          <BottomSheetModal
            bottomInset={5}
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{ backgroundColor: "#202020" }}
          >
            <BottomSheetScrollView style={styles.contentContainer}>
              <Text style={styles.tafsirText}>{tafsir.text}</Text>
            </BottomSheetScrollView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </ScrollView>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101010",
    paddingTop: 50,
  },
  tafsirText: {
    color: "#fff",
    lineHeight: 35,
    fontSize: 20,
    textAlign: "right",
    padding: 10,
  },
});
export default QuranReadScreen;
