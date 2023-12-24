import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { ReciterScreenContainer, HeaderContainer } from "../components";
import { SafeAreaView } from "react-native-safe-area-context";
const ReciterScreen = ({ navigation, route }) => {
  let screenToNavigate = "";
  if (route.params) {
    screenToNavigate = route.params.screenToNavigate;
  }
  return (
    <SafeAreaView style={styles.container}>
      <HeaderContainer
        headerText="reciter"
        navigation={navigation}
        backButton
        navigateScreen={screenToNavigate || "GoalScreen"}
      />
      <Text style={[styles.text, { fontSize: 24, marginTop: 20 }]}>
        Choose reciter
      </Text>
      <View style={styles.reciterContainer}>
        <ReciterScreenContainer />
      </View>
      {!screenToNavigate && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("TafsirScreen")}
          >
            <Text style={[styles.text, styles.buttonText]}>next</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101010",
    position: "relative",
    alignItems: "center",
  },
  header: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  headerText: {
    fontSize: 24,
    alignSelf: "center",
  },
  reciterContainer: {
    width: "100%",
    alignItems: "center",
  },

  button: {
    width: "90%",
    backgroundColor: "#9b6efc",
    position: "absolute",
    bottom: 30,
    borderRadius: 8,
    paddingVertical: 10,
  },
  buttonText: {
    textTransform: "capitalize",
    fontSize: 20,
  },
  buttonContainer: {
    alignItems: "center",
    position: "relative",
    flex: 1,
  },
});
export default ReciterScreen;
