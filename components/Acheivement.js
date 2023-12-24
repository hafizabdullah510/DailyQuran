import { StyleSheet, Text, View, Image } from "react-native";

const Acheivement = ({ icon, text, count, border }) => {
  return (
    <View style={[styles.container, { borderColor: border }]}>
      <View style={styles.textContainer}>
        <Text style={[styles.text, styles.name]}>{text}</Text>
        <Text style={[styles.text, styles.count]}>{count}</Text>
      </View>
      {icon}
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
  container: {
    backgroundColor: "#19191b",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
  },
  name: {
    fontSize: 20,
    textTransform: "capitalize",
  },
  count: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: 500,
  },
});
export default Acheivement;
