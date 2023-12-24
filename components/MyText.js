import { StyleSheet, Text, View } from "react-native";
const MyText = ({
  text,
  size,
  color,
  weight,
  capitalize,
  marginTop,
  align,
  marginLeft,
}) => {
  return (
    <Text
      style={{
        fontSize: parseInt(size),
        color: color,
        fontWeight: weight,
        textAlign: align,
        marginTop: marginTop,
        marginLeft: marginLeft && parseInt(marginLeft),
        textTransform: capitalize && "capitalize",
      }}
    >
      {text}
    </Text>
  );
};

export default MyText;
