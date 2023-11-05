import { StyleSheet, Text, View, FlatList } from "react-native";

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const date = new Date();
const weekday = date.getDay();

const DayOfWeek = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={dayNames}
        numColumns={7}
        alwaysBounceVertical={false}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.dayItem,
              {
                borderColor: dayNames[weekday] === item ? "#006600" : "#484848",
              },
            ]}
          >
            <Text
              style={[
                styles.dayText,
                {
                  color: dayNames[weekday] === item ? "#00ffff" : "#fff",
                },
              ]}
            >
              {item.charAt(0)}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    height: 70,
    alignItems: "center",
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#404040",
  },
  dayItem: {
    height: 40,
    width: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    borderWidth: 1,
  },
  dayText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
export default DayOfWeek;
