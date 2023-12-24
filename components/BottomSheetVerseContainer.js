import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useAPIContext } from "../context/APIcontext";
import { useAppContext } from "../context/AppContext";
import { FlatList } from "react-native-gesture-handler";

const BottomSheetChapterContainer = ({ headerComponent }) => {
  const { combineQuranData, closeRandomModal } = useAPIContext();
  const { setRandomAyahIndex, randomAyahIndex, randomChapterIndex } =
    useAppContext();
  const handleReadingState = (item) => {
    closeRandomModal();
    setRandomAyahIndex(item.numberInSurah - 1);
  };
  return (
    <View style={{ width: "90%" }}>
      <FlatList
        data={combineQuranData[randomChapterIndex].ayahs}
        alwaysBounceVertical={false}
        numColumns={5}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ gap: 20 }}
        ListHeaderComponent={headerComponent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.container,

              item.numberInSurah === randomAyahIndex + 1
                ? { borderWidth: 1, borderColor: "#9b6efc" }
                : "",
            ]}
            onPress={() => handleReadingState(item)}
          >
            <Text style={styles.text}>{item.numberInSurah}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontWeight: "bold",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#19191b",
    paddingVertical: 20,
    borderRadius: 8,
    alignItems: "center",
    width: "18%",
  },
  name: {
    fontSize: 20,
    textTransform: "capitalize",
  },
  info: {
    marginTop: 5,
    fontSize: 16,
    textTransform: "capitalize",
    fontWeight: 400,
    color: "#7d7c81",
  },
  verses: {
    fontSize: 16,
  },
});
export default BottomSheetChapterContainer;
