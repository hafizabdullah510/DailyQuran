import { StyleSheet, Text, View } from "react-native";
import { Platform, StatusBar } from "react-native";
import FilterContainer from "./FilterContainer";
import QuranReadInfoContainer from "./QuranReadInfoContainer";
import MyIcon from "./MyIcon";
import { useAppContext } from "../context/AppContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
const QuranReadInfo = ({ HeaderComponent }) => {
  const { filteredAcheivements, filterAcheivements, filterType } =
    useAppContext();

  useEffect(() => {
    filterAcheivements();
  }, [filterType]);
  const seconds = filteredAcheivements?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.seconds,
    0
  );
  const minutes = Math.floor(seconds / 60);
  const infoData = [
    {
      icon: (
        <MyIcon name="document-text" size="48" color="#80ceff" center ionIcon />
      ),
      text: "verses",
      count: 0,
      border: "#80ceff",
    },
    {
      icon: <MyIcon name="time" size="48" color="#feb779" center ionIcon />,
      text: "time",
      count: `${minutes || 0}m`,
      border: "#feb779",
    },
    {
      icon: (
        <MyIcon name="document-text" size="48" color="#45dac0" center ionIcon />
      ),
      text: "pages",
      count: 0,
      border: "#45dac0",
    },
  ];

  const header = () => {
    return (
      <SafeAreaView
        edges={["top", "right", "left"]}
        style={[{ alignItems: "center" }]}
      >
        <HeaderComponent />
        <View style={styles.container}>
          <FilterContainer />
        </View>
      </SafeAreaView>
    );
  };
  return (
    <View style={styles.infoContainer}>
      <QuranReadInfoContainer data={infoData} headerComponent={header} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginTop: 20,
  },
  headerContainer: {
    width: "100%",
  },
});

export default QuranReadInfo;
