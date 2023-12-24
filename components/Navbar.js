import { StyleSheet, Text, View, Image } from "react-native";
import MyIcon from "./MyIcon";
import MyText from "./MyText";
const Navbar = () => {
  return (
    <View style={styles.navbar}>
      <View style={styles.picContainer}>
        <View style={styles.navPic} />

        <MyText
          text="Salam, Hafiz Abd.."
          size="20"
          weight="bold"
          color="#fff"
          marginLeft="10"
        />
      </View>
      <View style={styles.streakContainer}>
        <MyIcon
          name="crown-circle"
          color="#291955"
          marginRight="10"
          size="32"
          material
        />
        <Text style={{ color: "#291955", fontSize: 20, fontWeight: "bold" }}>
          1
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  navbar: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  picContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  streakContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E4B7E5",
    padding: 4,
    borderRadius: 8,
  },
  navPic: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: "#60deb8",
  },
});
export default Navbar;
