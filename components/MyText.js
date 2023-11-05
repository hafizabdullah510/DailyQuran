import { StyleSheet, Text, View } from "react-native";
const MyText = ({
  text,
  size,
  color,
  weight,
  capitalize,
  marginTop,
  align,
}) => {
  return (
    <Text
      style={{
        fontSize: size,
        color: color,
        fontWeight: weight,
        textAlign: align,
        marginTop: marginTop,
        textTransform: capitalize && "capitalize",
      }}
    >
      {text}
    </Text>
  );
};

export default MyText;
