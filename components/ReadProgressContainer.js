import { StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import MyText from "./MyText";
const ReadProgressContainer = ({ data }) => {
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
          text={`Juz ${data.juz_number} : ${data.total_Juz_verses} verses left`}
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
    width: "90%",
    marginTop: 50,
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
