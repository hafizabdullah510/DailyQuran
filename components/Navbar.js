import { StyleSheet, Text, View, Image } from "react-native";
import MyIcon from "./MyIcon";
import MyText from "./MyText";
const Navbar = () => {
  return (
    <View style={styles.navbar}>
      <View style={styles.picContainer}>
        <Image
          style={styles.navPic}
          source={require("../assets/profile-pix.jpg")}
        />
        <MyText
          text="Salam,Hafiz Abdu..."
          size="24"
          weight="bold"
          color="#fff"
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
    height: 80,
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
    padding: 5,
    borderRadius: 8,
  },
  navPic: {
    height: 50,
    width: 50,
    display: "block",
    borderRadius: "50%",
    marginRight: 10,
  },
});
export default Navbar;
