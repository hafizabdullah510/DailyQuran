import { FlatList, StyleSheet, Text, View } from "react-native";
import { filterOptions } from "../utils/constants";
import { Button } from "react-native-paper";
const FilterContainer = () => {
  const good = true;
  return (
    <View style={styles.container}>
      <FlatList
        data={filterOptions}
        numColumns={3}
        alwaysBounceVertical={false}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <Button
            mode={good ? "outlined" : "contained"}
            labelStyle={{
              fontSize: 20,
              textTransform: "capitalize",
              color: "#fff",
            }}
          >
            {item}
          </Button>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  filterText: {
    fontSize: 26,
    color: "#fff",
    textTransform: "capitalize",
    textAlign: "center",
  },
});

export default FilterContainer;
