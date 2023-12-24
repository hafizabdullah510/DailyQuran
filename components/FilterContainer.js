import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useAppContext } from "../context/AppContext";

const FilterContainer = () => {
  const { setFilterType, filterType } = useAppContext();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            borderColor: filterType === "today" ? "#9c6dfa" : "#fff",
          },
        ]}
        onPress={() => setFilterType("today")}
      >
        <Text
          style={[
            styles.text,
            {
              color: filterType === "today" ? "#9c6dfa" : "#fff",
              fontWeight: filterType === "today" ? "bold" : "400",
            },
          ]}
        >
          today
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          {
            borderColor: filterType === "week" ? "#9c6dfa" : "#fff",
          },
        ]}
        onPress={() => setFilterType("week")}
      >
        <Text
          style={[
            styles.text,

            {
              color: filterType === "week" ? "#9c6dfa" : "#fff",
              fontWeight: filterType === "week" ? "bold" : "400",
            },
          ]}
        >
          week
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          {
            borderColor: filterType === "all" ? "#9c6dfa" : "#fff",
          },
        ]}
        onPress={() => setFilterType("all")}
      >
        <Text
          style={[
            styles.text,
            {
              color: filterType === "all" ? "#9c6dfa" : "#fff",

              fontWeight: filterType === "all" ? "bold" : "400",
            },
          ]}
        >
          all
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    borderWidth: 1,
    paddingVertical: 8,
    borderRadius: 16,
    width: "30%",
  },
  text: {
    fontSize: 20,
    textTransform: "capitalize",
    textAlign: "center",
  },
});

export default FilterContainer;
