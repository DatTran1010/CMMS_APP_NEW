import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CustomTextInput from "../../components/TextInput";
import { heightTextInput } from "../../Common/dimentions";

const InListGiamSat = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <View style={styles.leftinput}>
          <CustomTextInput height={heightTextInput} placeholder="Kết quả" />
        </View>
        <View style={styles.rightinput}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "400",
              paddingHorizontal: 10,
            }}
          >
            {data.TINH_TRANG}
          </Text>
          <View style={{ flex: 1 }}>
            <CustomTextInput height={heightTextInput} placeholder="Ghi chú" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default InListGiamSat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftinput: {
    flex: 1,
  },
  rightinput: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
  },
});
