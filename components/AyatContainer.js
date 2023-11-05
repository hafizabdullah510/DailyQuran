import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MyIcon from "./MyIcon";
import MyText from "./MyText";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";

const AyatContainer = ({
  data,
  surahData,
  readingState,
  setTafsir,
  handlePresentModal,
  loading,
}) => {
  console.log(readingState);
  const { name_simple, verses_count } = surahData;
  const [sound, setSound] = useState("");
  async function playSound() {
    try {
      console.log("Loading Sound");
      const audioUrlResponse = await axios.get(
        `https://api.quran.com/api/v4/recitations/${readingState.recitation_id}/by_ayah/${readingState.chapter_number}:${readingState.current_verse_number}`
      );
      const audioFiles = await audioUrlResponse.data.audio_files;
      const { sound } = await Audio.Sound.createAsync({
        uri: `https://verses.quran.com/${audioFiles[0].url}`,
      });
      setSound(sound);

      console.log("Playing Sound");
      await sound.playAsync();
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  const getTafsir = async () => {
    try {
      console.log(readingState);
      const response = await axios.get(
        `https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir/ur-tafseer-ibn-e-kaseer/${readingState.chapter_number}/${readingState.current_verse_number}.json`
      );
      const data = await response.data;
      setTafsir(data);
      handlePresentModal();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View style={styles.header}>
            <View style={styles.leftSection}>
              <TouchableOpacity onPress={getTafsir}>
                <MyIcon name="magnify" material size="32" color="#111111" />
              </TouchableOpacity>
              <TouchableOpacity onPress={playSound}>
                <MyIcon name="soundcloud" material size="32" color="#111111" />
              </TouchableOpacity>
            </View>
            <View style={styles.middleSection}>
              <MyText
                text={`${name_simple}` || ""}
                size="20"
                color="#111111"
                weight="500"
              />
              <MyText
                text={`${readingState.current_verse_number} / ${verses_count}`}
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
          <View style={styles.ayat}>
            <Text style={[styles.ayatText]}>
              {data[readingState.ayah_index]?.text_uthmani || ""}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginTop: 20,
    backgroundColor: "#faf7ff",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
  },
  ayat: {
    paddingVertical: 20,
  },
  ayatText: {
    fontSize: 32,
    textAlign: "center",
    lineHeight: 45,
    fontFamily: "arabic-font",
  },
});
export default AyatContainer;
