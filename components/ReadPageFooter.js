import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MyIcon from "./MyIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const ReadPageFooter = ({
  readingState,
  setReadingState,
  surahData,
  previousSurahVersesCount,
}) => {
  const { verses_count } = surahData;
  const [ayahState, setAyahState] = useState(readingState.ayah_index);

  const goBack = () => {
    console.log(readingState);
    if (readingState.current_verse_number > 1) {
      setReadingState({
        ...readingState,
        ayah_index: readingState.ayah_index - 1,
        current_verse_number: readingState.current_verse_number - 1,
      });
    } else {
      if (readingState.chapter_number == 1) {
        setReadingState({
          ...readingState,
          ayah_index: 6235,
          chapter_number: 114,
          current_verse_number: 6,
        });
      } else {
        setReadingState({
          ...readingState,
          ayah_index: readingState.ayah_index - 1,
          chapter_number: readingState.chapter_number - 1,
          current_verse_number: previousSurahVersesCount,
        });
      }
    }
  };
  const goForward = async () => {
    if (readingState.current_verse_number < verses_count) {
      setReadingState({
        ...readingState,
        current_verse_number: readingState.current_verse_number + 1,
        verse_read: readingState.verse_read + 1,
        ayah_index_read: readingState.ayah_index_read + 1,
        ayah_index: readingState.ayah_index + 1,
      });
    } else {
      setReadingState({
        ...readingState,
        current_verse_number: 1,
        verse_read: 1,
        ayah_index_read:
          readingState.ayah_index < 6235 ? readingState.ayah_index + 1 : 0,
        ayah_index:
          readingState.ayah_index < 6235 ? readingState.ayah_index + 1 : 0,
        chapter_number:
          readingState.chapter_number < 114
            ? readingState.chapter_number + 1
            : 1,
        chapter_read:
          readingState.chapter_read < 114 ? readingState.chapter_read + 1 : 1,
      });
    }
    setAyahState(ayahState + 1);
  };
  useEffect(() => {
    const saveReaderState = async () => {
      try {
        const jsonData = JSON.stringify(readingState);
        await AsyncStorage.setItem("readerState", jsonData);
      } catch (error) {
        console.log(error);
      }
    };
    saveReaderState();
  }, [readingState]);
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        onPress={goBack}
        style={[
          styles.button,
          {
            backgroundColor: "#101010",
          },
        ]}
      >
        <MyIcon name="arrow-back" size="32" ionIcon color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.doneBtnText}>I'm Done</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={goForward}
        style={[
          styles.button,
          {
            backgroundColor: "#fff",
          },
        ]}
      >
        <MyIcon name="arrow-forward" size="32" ionIcon color="#222" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#101010",
    height: 96,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 30,
    backgroundColor: "#222",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
  },
  doneBtnText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
export default ReadPageFooter;
