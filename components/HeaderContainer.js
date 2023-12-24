import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyIcon from "./MyIcon";
import { useAppContext } from "../context/AppContext";
const HeaderContainer = ({
  headerText,
  navigation,
  navigateScreen,
  backButton,
}) => {
  const { userState } = useAppContext();
  const handleNavigation = async () => {
    navigation.navigate(navigateScreen);
    if (navigateScreen === "Settings") {
      try {
        await AsyncStorage.setItem("userState", JSON.stringify(userState));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.header}>
      {backButton && (
        <TouchableOpacity style={styles.backButton} onPress={handleNavigation}>
          <MyIcon name="arrow-back" size="32" ionIcon color="#fff" />
        </TouchableOpacity>
      )}

      <Text style={[styles.text, styles.headerText]}>{headerText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  navPic: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: "#60deb8",
    position: "absolute",
    left: 0,
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "capitalize",
  },
  headerText: {
    fontSize: 24,
    alignSelf: "center",
  },
});

export default HeaderContainer;
