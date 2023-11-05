import { StyleSheet, Text, View } from "react-native";
import Loading from "./Loading";
import { ScrollView } from "react-native-gesture-handler";
const TranslationContainer = ({
  loading,
  quranTranslationData,
  readingState,
}) => {
  return (
    <ScrollView style={styles.translationContainer}>
      {loading ? (
        <Loading />
      ) : (
        <View>
          <Text style={styles.translation}>
            {quranTranslationData[readingState.ayah_index]?.text}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  translationContainer: {
    width: "90%",
    marginTop: 20,
  },
  translation: {
    fontSize: 20,
    color: "#fff",
    lineHeight: 40,
    textAlign: "center",
    fontFamily: "urdu-font",
  },
});
export default TranslationContainer;
