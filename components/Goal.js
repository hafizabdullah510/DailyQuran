import { StyleSheet, Text, View, Image } from "react-native";
import MyText from "./MyText";
import * as Progress from "react-native-progress";
import { Button } from "react-native-paper";
import { useAPIContext } from "../context/APIcontext";
import { useAppContext } from "../context/AppContext";
const Goal = ({ navigation, quran }) => {
  const { chapterIndex, ayahIndex } = useAppContext();
  const navigateReadScreen = () => {
    navigation.navigate("ReadScreen");
  };
  return (
    <View style={styles.goalContainer}>
      <View style={styles.goalHeader}>
        <View style={styles.leftHeader}>
          <MyText text="Goal" size="32" color="#fff" weight="500" />
          <View style={styles.surahInfo}>
            <MyText
              text={`${quran?.[chapterIndex].number}` || ""}
              size="16"
              color="#fff"
              weight="400"
            />
            <MyText
              text={`${quran?.[chapterIndex].englishName}` || ""}
              size="16"
              color="#fff"
              weight="400"
            />
            <MyText text="|" size="16" color="#fff" weight="400" />
            <MyText
              text={`${quran?.[chapterIndex].ayahs?.[ayahIndex].numberInSurah} / ${quran?.[chapterIndex].ayahs?.length}`}
              size="16"
              color="#fff"
              weight="400"
            />
          </View>
        </View>
        <MyText text="0%" size="24" color="#fff" weight="bold" />
      </View>
      <View style={styles.progressView}>
        <Progress.Bar
          progress={0.3}
          width={null}
          color="#694eaf"
          height={15}
          borderRadius={8}
        />
        <View style={styles.progressInfo}>
          <MyText text="0/5" size="20" color="#fff" weight="bold" />
          <MyText text="verses per day" size="20" color="#fff" weight="400" />
        </View>
        <View style={styles.readButton}>
          <Button
            mode="contained"
            buttonColor="#101010"
            textColor="#fff"
            labelStyle={{ fontSize: 20 }}
            contentStyle={{ height: 50 }}
            onPress={() => navigateReadScreen()}
          >
            Read Quran
          </Button>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  goalContainer: {
    marginTop: 10,
    width: "90%",
    backgroundColor: "#bb9efd",
    padding: 20,
    borderRadius: 12,
  },
  goalHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  surahInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 16,
  },
  progressView: {
    marginTop: 20,
  },
  progressInfo: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    marginTop: 5,
    alignItems: "center",
  },
  readButton: {
    marginTop: 20,
  },
});

export default Goal;
