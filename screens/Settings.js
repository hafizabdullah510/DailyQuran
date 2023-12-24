import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { HeaderContainer } from "../components";
import { SafeAreaView } from "react-native-safe-area-context";
const Settings = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderContainer headerText="settings" />
      <View style={styles.mainContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.push("ReciterScreen", { screenToNavigate: "Settings" })
          }
        >
          <Text style={[styles.text, styles.buttonText]}>Reciter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.push("GoalScreen", { screenToNavigate: "Settings" })
          }
        >
          <Text style={[styles.text, styles.buttonText]}>goal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.push("TafsirScreen", { screenToNavigate: "Settings" })
          }
        >
          <Text style={[styles.text, styles.buttonText]}>tafsir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={[styles.text, styles.buttonText]}>alert</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101010",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
  headerText: {
    fontSize: 24,
  },
  mainContainer: {
    width: "90%",
  },
  button: {
    width: "100%",
    backgroundColor: "#19191b",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginTop: 20,
  },
  buttonText: {
    textTransform: "capitalize",
    fontSize: 20,
  },
});

export default Settings;
