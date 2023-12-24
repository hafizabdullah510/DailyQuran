import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GoalsScreenContainer, MyIcon, HeaderContainer } from "../components";
const GoalScreen = ({ navigation, route }) => {
  let screenToNavigate = "";
  if (route.params) {
    screenToNavigate = route.params.screenToNavigate;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <HeaderContainer
          headerText="goal"
          navigateScreen={screenToNavigate ? screenToNavigate : null}
          backButton={screenToNavigate ? true : false}
          navigation={navigation}
        />
      </View>
      <View style={styles.mainContainer}>
        <Text style={[styles.text, styles.goalHeaderText]}>
          Your daily goal
        </Text>
        <View style={styles.goalsContainer}>
          <GoalsScreenContainer />
        </View>
        <View style={styles.suggestionContainer}>
          <MyIcon name="flower" size="48" color="#fc6493" center material />
          <Text
            style={[
              styles.text,
              {
                fontSize: 16,
                fontWeight: "500",
                maxWidth: 300,
                marginTop: 10,
              },
            ]}
          >
            The most beloved deed to Allah is that which is regular and
            consistent even if it is little
          </Text>
        </View>
        {!screenToNavigate && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("ReciterScreen")}
          >
            <Text style={[styles.text, styles.buttonText]}>next</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101010",
    position: "relative",
  },
  header: {
    width: "100%",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  goalHeaderText: {
    fontSize: 24,
  },
  mainContainer: {
    alignItems: "center",
    marginTop: 20,
    flex: 1,
  },
  goalsContainer: {
    width: "90%",
    marginTop: 20,
  },
  suggestionContainer: {
    marginTop: 20,
    width: "90%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#9b6efc",
    borderStyle: "dashed",
    borderRadius: 8,
    paddingVertical: 20,
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
});
export default GoalScreen;
