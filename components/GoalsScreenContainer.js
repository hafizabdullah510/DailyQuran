import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useAppContext } from "../context/AppContext";
const numbers = [1, 3, 5, 10];
const GoalsScreenContainer = () => {
  const { setUserState, userState } = useAppContext();
  return (
    <View style={styles.container}>
      <FlatList
        data={numbers}
        numColumns={2}
        alwaysBounceVertical={false}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ gap: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.goalContainer,
              userState.daily_goal === item
                ? { borderWidth: 1, borderColor: "#9b6efc" }
                : {},
            ]}
            onPress={() => setUserState({ ...userState, daily_goal: item })}
          >
            <Text
              style={[
                styles.text,
                styles.goalNumber,
                userState.daily_goal === item ? { color: "#9b6efc" } : {},
              ]}
            >
              {item}
            </Text>
            <Text
              style={[
                styles.text,
                styles.goalText,
                userState.daily_goal === item ? { color: "#9b6efc" } : {},
              ]}
            >
              {`verse${userState.daily_goal > 1 ? "s" : ""} per day`}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  goalContainer: {
    backgroundColor: "#19191b",
    paddingVertical: 20,
    width: "48%",
    borderRadius: 8,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  goalNumber: {
    fontSize: 32,
  },
  goalText: {
    fontSize: 20,
    fontWeight: "500",
    marginTop: 10,
  },
});
export default GoalsScreenContainer;
