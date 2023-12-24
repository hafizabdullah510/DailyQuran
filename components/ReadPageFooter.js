import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MyIcon from "./MyIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../context/AppContext";
import { useAPIContext } from "../context/APIcontext";
const ReadPageFooter = ({ quranData, params, timeSpent }) => {
  const navigation = useNavigation();
  const {
    chapterIndex,
    randomChapterIndex,
    ayahIndex,
    randomAyahIndex,
    setChapterIndex,
    setRandomChapterIndex,
    setAyahIndex,
    setRandomAyahIndex,
    saveState,
    formattedDate,
    handleScreenTime,
    filterAcheivements,
  } = useAppContext();
  const { playSound, soundPlaying } = useAPIContext();
  const goForward = () => {
    if (soundPlaying) {
      playSound();
    }
    if (params) {
      if (
        quranData[randomChapterIndex].ayahs[randomAyahIndex].numberInSurah <
        quranData[randomChapterIndex].ayahs.length
      ) {
        setRandomAyahIndex(randomAyahIndex + 1);
      } else {
        if (
          randomChapterIndex === 113 &&
          quranData[randomChapterIndex].ayahs[randomAyahIndex].numberInSurah ===
            quranData[randomChapterIndex].ayahs.length
        ) {
          setRandomChapterIndex(0);
          setRandomAyahIndex(0);
        } else {
          setRandomChapterIndex(randomChapterIndex + 1);
          setRandomAyahIndex(0);
        }
      }
    } else {
      if (
        quranData[chapterIndex].ayahs[ayahIndex].numberInSurah <
        quranData[chapterIndex].ayahs.length
      ) {
        setAyahIndex(ayahIndex + 1);
      } else {
        if (
          chapterIndex === 113 &&
          quranData[chapterIndex].ayahs[ayahIndex].numberInSurah ===
            quranData[chapterIndex].ayahs.length
        ) {
          setChapterIndex(0);
          setAyahIndex(0);
        } else {
          setChapterIndex(chapterIndex + 1);
          setAyahIndex(0);
        }
      }
    }
  };
  const goBack = () => {
    if (soundPlaying) {
      playSound();
    }
    if (params) {
      if (
        quranData[randomChapterIndex].ayahs[randomAyahIndex].numberInSurah > 1
      ) {
        setRandomAyahIndex(randomAyahIndex - 1);
      } else {
        if (
          randomChapterIndex === 0 &&
          quranData[randomChapterIndex].ayahs[randomAyahIndex].numberInSurah ===
            1
        ) {
          setRandomChapterIndex(113);
          setRandomAyahIndex(quranData[113].ayahs.length - 1);
        } else {
          setRandomChapterIndex(randomChapterIndex - 1);
          setRandomAyahIndex(
            quranData[randomChapterIndex - 1].ayahs.length - 1
          );
        }
      }
    } else {
      if (quranData[chapterIndex].ayahs[ayahIndex].numberInSurah > 1) {
        setAyahIndex(ayahIndex - 1);
      } else {
        if (
          chapterIndex === 0 &&
          quranData[chapterIndex].ayahs[ayahIndex].numberInSurah === 1
        ) {
          setChapterIndex(113);
          setAyahIndex(quranData[113].ayahs.length - 1);
        } else {
          setChapterIndex(chapterIndex - 1);
          setAyahIndex(quranData[chapterIndex - 1].ayahs.length - 1);
        }
      }
    }
  };

  return (
    <View style={styles.footer}>
      <View
        style={{
          width: "90%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            const obj = { seconds: timeSpent, date: formattedDate };
            saveState();
            handleScreenTime(obj);

            if (soundPlaying) {
              playSound();
            }
            filterAcheivements();
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.doneBtnText}>I'm Done</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => goForward()}
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
    </View>
  );
};
const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#101010",
    height: 96,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingVertical: 8,
    width: "30%",
    backgroundColor: "#222",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  doneBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default ReadPageFooter;
