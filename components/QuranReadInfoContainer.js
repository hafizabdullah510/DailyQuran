import { FlatList, StyleSheet, Text, View } from "react-native";
import MyText from "./MyText";

const QuranReadInfoContainer = ({ data }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        alwaysBounceVertical={false}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ gap: 20 }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.infoContainer,
              {
                borderColor: item.border,
              },
            ]}
          >
            {item.icon}
            <MyText
              size="20"
              color="#fff"
              text={item.text}
              weight="500"
              marginTop="5%"
              align="center"
              capitalize
            />
            <MyText
              size="20"
              color="#fff"
              text={item.count}
              align="center"
              marginTop="5%"
              capitalize
            />
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
    paddingVertical: 15,
    borderRadius: 10,
    width: "48%",
  },
});

export default QuranReadInfoContainer;
