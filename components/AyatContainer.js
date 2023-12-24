import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import MyIcon from "./MyIcon";
import MyText from "./MyText";
import Loading from "./Loading";
import { useAppContext } from "../context/AppContext";
import { useAPIContext } from "../context/APIcontext";
const AyatContainer = ({ data, params }) => {
  const {
    chapterIndex,
    ayahIndex,
    userState,
    randomChapterIndex,
    randomAyahIndex,
  } = useAppContext();
  const {
    playSound,
    getTafsir,
    soundPlaying,
    soundLoading,
    tafsirLoading,
    soundPlayingState,
    pauseSound,
    resumeSound,
  } = useAPIContext();

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <View style={styles.leftSection}>
            <TouchableOpacity
              onPress={() =>
                getTafsir(
                  data?.[params ? randomChapterIndex : chapterIndex].number,
                  data?.[params ? randomChapterIndex : chapterIndex].ayahs?.[
                    params ? randomAyahIndex : ayahIndex
                  ].numberInSurah,
                  userState.tafsir_id
                )
              }
            >
              {tafsirLoading ? (
                <Loading size={30} />
              ) : (
                <MyIcon name="book-outline" ionIcon size="32" color="#111111" />
              )}
            </TouchableOpacity>
            {soundLoading ? (
              <Loading size={30} />
            ) : (
              <>
                {soundPlayingState ? (
                  <TouchableOpacity onPress={pauseSound}>
                    <MyIcon
                      name="pause-circle-outline"
                      material
                      size="32"
                      color="#b82525"
                    />
                  </TouchableOpacity>
                ) : (
                  <>
                    {soundPlaying ? (
                      <TouchableOpacity onPress={resumeSound}>
                        <MyIcon
                          name="waveform"
                          material
                          size="32"
                          color={"#694eaf"}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() =>
                          playSound(
                            data?.[params ? randomChapterIndex : chapterIndex]
                              .number,
                            data?.[params ? randomChapterIndex : chapterIndex]
                              .ayahs?.[params ? randomAyahIndex : ayahIndex]
                              .numberInSurah,
                            userState.reciter_id
                          )
                        }
                      >
                        <MyIcon
                          name="waveform"
                          material
                          size="32"
                          color={"#111111"}
                        />
                      </TouchableOpacity>
                    )}
                  </>
                )}
              </>
            )}
          </View>
          <View style={styles.middleSection}>
            <MyText
              text={
                `${
                  data?.[params ? randomChapterIndex : chapterIndex].englishName
                }` || ""
              }
              size="20"
              color="#111111"
              weight="500"
            />
            <MyText
              text={`${
                data?.[params ? randomChapterIndex : chapterIndex].ayahs?.[
                  params ? randomAyahIndex : ayahIndex
                ].numberInSurah
              } / ${
                data?.[params ? randomChapterIndex : chapterIndex].ayahs?.length
              }`}
              size="16"
              color="#111111"
              weight="500"
              align="center"
              marginTop="5%"
            />
          </View>
          <View style={styles.rightSection}>
            <MyIcon name="heart-outline" material size="32" color="#111111" />
            <MyText text="7.8k" size="12" color="#111111" weight="500" />
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.ayat}>
            <Text style={[styles.ayatText]}>
              {data?.[params ? randomChapterIndex : chapterIndex].ayahs?.[
                params ? randomAyahIndex : ayahIndex
              ].text || ""}
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 20,
    backgroundColor: "#faf7ff",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    position: "relative",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 1,
    backgroundColor: "#faf7ff",
    paddingBottom: 10,
  },
  leftSection: {
    display: "flex",
    flexDirection: "row",
    // alignItems: "center",
    gap: 10,
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
  },
  ayat: {
    paddingTop: 60,
    paddingBottom: 30,
  },
  ayatText: {
    fontSize: 32,
    textAlign: "center",
    lineHeight: 45,
    fontFamily: "arabic-font",
  },
});
export default AyatContainer;
