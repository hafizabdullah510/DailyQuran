import { StyleSheet, Text, View } from "react-native";
import MyIcon from "./MyIcon";
import MyText from "./MyText";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
const ReadHeader = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <MyIcon name="arrow-back" size="32" ionIcon color="#fff" />
      </TouchableOpacity>
      <View style={styles.statusContainer}>
        <View style={styles.status}>
          <MyIcon name="flower" size="24" material color="#fc6493" />
          <MyText text="0" color="#fff" size="20" weight="bold" />
        </View>
        <View style={styles.status}>
          <MyIcon name="document-text" size="24" ionIcon color="#80ceff" />
          <MyText text="0" color="#fff" size="20" weight="bold" />
        </View>
        <View style={styles.status}>
          <MyIcon name="time" size="24" ionIcon color="#feb779" />
          <MyText text="0" color="#fff" size="20" weight="bold" />
        </View>
      </View>
      <MyIcon name="settings-outline" ionIcon size="32" color="#fff" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
  },
  statusContainer: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 15,
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E4B7E5",
    borderRadius: 24,
  },
  status: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
export default ReadHeader;
