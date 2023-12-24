import { StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import MyText from "./MyText";
import { useAppContext } from "../context/AppContext";

const ReadProgressContainer = ({ quranData, params }) => {
  const { chapterIndex, ayahIndex, randomChapterIndex, randomAyahIndex } =
    useAppContext();

  return (
    <View style={styles.container}>
      <Progress.Bar
        progress={0.3}
        width={null}
        color="#694eaf"
        height={15}
        borderRadius={8}
      />
      <View style={styles.progressInfo}>
        <MyText text="0/5" size="20" color="#fff" weight="bold" />
        <MyText
          text={`Juz : ${
            quranData?.[params ? randomChapterIndex : chapterIndex].ayahs?.[
              params ? randomAyahIndex : ayahIndex
            ].juz
          }`}
          size="20"
          color="#fff"
          weight="400"
        />
        <MyText text="0%" size="20" color="#fff" weight="bold" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 30,
  },
  progressInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
  },
});
export default ReadProgressContainer;
