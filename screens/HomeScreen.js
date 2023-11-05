import { StyleSheet, Text, View } from "react-native";
import { Navbar, DayOfWeek, Goal, QuranReadInfo } from "../components";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

const HomeScreen = ({ navigation }) => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Navbar />
        <DayOfWeek />
        <Goal navigation={navigation} />
        <QuranReadInfo />
      </ScrollView>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101010",
    paddingTop: 50,
  },
});
export default HomeScreen;
