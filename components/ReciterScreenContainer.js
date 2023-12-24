import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useAPIContext } from "../context/APIcontext";
import MyIcon from "./MyIcon";
import { useAppContext } from "../context/AppContext";
const reciters = [
  { id: 3, name: "Abdul Rahman Al-Sudais" },
  { id: 10, name: "Saud Al-Shuraim" },
  { id: 1, name: "AbdulBaset AbdulSamad" },
];
const ReciterScreenContainer = () => {
  const { reciterId, userState, setUserState } = useAppContext();
  const { playSound, soundPlaying } = useAPIContext();

  return (
    <View style={styles.container}>
      <FlatList
        data={reciters}
        numColumns={1}
        alwaysBounceVertical={false}
        contentContainerStyle={{ gap: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.reciterButton,
              reciterId === item.id
                ? { borderWidth: 1, borderColor: "#9b6efc" }
                : {},
            ]}
            onPress={() =>
              setUserState({
                ...userState,
                reciter_id: item.id,
              })
            }
          >
            <Text
              style={[
                styles.text,
                styles.reciterName,
                reciterId === item.id ? { color: "#9b6efc" } : {},
              ]}
            >
              {item.name}
            </Text>
            <TouchableOpacity
              onPress={
                reciterId === item.id ? () => playSound(1, 2, item.id) : null
              }
            >
              <MyIcon
                name="soundcloud"
                material
                size="32"
                color={
                  reciterId === item.id && soundPlaying ? "#b82525" : "#fff"
                }
              />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginTop: 20,
  },
  reciterButton: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: "#19191b",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },

  reciterName: {
    fontSize: 20,
    fontWeight: "500",
  },
});
export default ReciterScreenContainer;
