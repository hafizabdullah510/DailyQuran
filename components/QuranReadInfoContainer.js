import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Acheivement from "./Acheivement";
import { SafeAreaView } from "react-native-safe-area-context";

const QuranReadInfoContainer = ({ data, headerComponent }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        alwaysBounceVertical={false}
        contentContainerStyle={{ gap: 20 }}
        ListHeaderComponent={headerComponent}
        ListFooterComponent={SafeAreaView}
        renderItem={({ item }) => (
          <View style={[styles.infoContainer]}>
            <Acheivement {...item} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  infoContainer: {
    borderWidth: 1,
    width: "90%",
    alignSelf: "center",
  },
});

export default QuranReadInfoContainer;
