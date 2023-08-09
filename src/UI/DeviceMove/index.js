import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  TouchableNativeFeedback,
  Animated,
  LayoutAnimation,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";

import colors from "../../Common/colors";
import { heightTextArea, windowHeight } from "../../Common/dimentions";
import DropDown from "../../components/DropDown";
import HeaderApp from "../Home/HeaderApp";
import Line from "../../components/Line";
import IconButton from "../../components/IconButton";
import RadioButton from "../../components/RadioButton";

const DeviceMove = ({ navigation }) => {
  const [dataDiaDiem, setDataDiaDiem] = useState([
    { label: "Trong xưởng", value: 1 },
    { label: "Văn phòng", value: 2 },
    { label: "Nhà vệ sinh", value: 3 },
    { label: "Nhà Kho", value: 4 },
    { label: "Tầng Thượng", value: 5 },
    { label: "Sân Bãi", value: 6 },
    { label: "Cây dừa", value: 7 },
    { label: "Cây tre", value: 8 },
  ]);

  const [data, setData] = useState([
    {
      id: 1,
      NGAY: "2/10/2023 10:51:40 AM",
      MS_TB: "GEL - 3001",
      SO_NGAY: "180",
      CONG_VIEC_BT: "Bảo trì chung (các hệ thống khác-ngoài MMTB SX)",
      DIA_DIEM_1: "Bên Ngoài Nhà Xưởng Hà Nam",
      DIA_DIEM_2: "Gia Súc Hưng Yên",
    },
    {
      id: 2,
      NGAY: "2/10/2023 10:51:40 AM",
      MS_TB: "LIT-1506",
      SO_NGAY: "180",
      CONG_VIEC_BT: "Hệ thống chiếu sáng bên ngoài",
      DIA_DIEM_1: "Bên ngoài nhà xưởng Bình Định",
      DIA_DIEM_2: "Bên Ngoài Nhà Xưởng Hưng Yên",
    },
    {
      id: 3,
      NGAY: "2/10/2023 10:51:40 AM",
      MS_TB: "LIT-1506",
      SO_NGAY: "180",
      CONG_VIEC_BT: "Hệ thống chiếu sáng bên ngoài",
      DIA_DIEM_1: "Bên ngoài nhà xưởng Bình Định",
      DIA_DIEM_2: "Bên Ngoài Nhà Xưởng Hưng Yên",
    },
    {
      id: 4,
      NGAY: "2/10/2023 10:51:40 AM",
      MS_TB: "LIT-1506",
      SO_NGAY: "180",
      CONG_VIEC_BT: "Hệ thống chiếu sáng bên ngoài",
      DIA_DIEM_1: "Bên ngoài nhà xưởng Bình Định",
      DIA_DIEM_2: "Bên Ngoài Nhà Xưởng Hưng Yên",
    },
  ]);

  const [selectedIndexCard, setSelectedIndexCard] = useState(null);

  const handleCard = (index) => {
    setSelectedIndexCard(index);
  };

  const unhandleCard = () => {
    setSelectedIndexCard(null);
  };

  //#region  Xử lý radio button
  const optionsRadio = [
    {
      id: 1,
      label: "Chuyển đi",
    },
    {
      id: 2,
      label: "Chuyển đến",
    },
  ];

  const [selectedOption, setSelectedOption] = useState({ 1: true });

  const handleSelectedOption = (optionId) => {
    setSelectedOption({ [optionId]: true });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  //#endregion

  const handleSave = () => {
    Toast.show({
      type: "success",
      text1: "Thông báo",
      text2: "Cập nhật thành công",
    });
  };
  return (
    <View style={styles.container}>
      <HeaderApp
        navigation={navigation}
        title="DI CHUYỂN THIẾT BỊ"
        headerLeftVisible={true}
        goBack={true}
      />
      <View style={[{ flexDirection: "row", flex: 1, marginHorizontal: 10 }]}>
        {optionsRadio.map((option) => (
          <View key={option.id} style={{ flex: 1 }}>
            <RadioButton
              label={option.label}
              onSelected={() => handleSelectedOption(option.id)}
              selected={selectedOption[option.id]}
            />
          </View>
        ))}
      </View>
      <View onStartShouldSetResponder={unhandleCard} style={styles.control}>
        <Animated.View
          style={[
            styles.headerContent,
            { flex: parseInt(Object.keys(selectedOption)[0]) === 2 ? 0.2 : 1 },
          ]}
        >
          {parseInt(Object.keys(selectedOption)[0]) === 1 ? (
            <>
              <View style={styles.viewInput}>
                <DropDown
                  placeholder={"Nơi chuyển đi"}
                  data={dataDiaDiem}
                  labelField={"label"}
                  valueField={"value"}
                  iconColor={colors.white}
                />
                <TouchableOpacity style={[styles.barcodeView]}>
                  <Image
                    style={styles.barcode}
                    source={require("../../../assets/barcode.png")}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.viewInput}>
                <DropDown
                  placeholder={"Nơi chuyển đến"}
                  data={dataDiaDiem}
                  labelField={"label"}
                  valueField={"value"}
                  iconColor={colors.white}
                />
                <TouchableOpacity style={[styles.barcodeView]}>
                  <Image
                    style={styles.barcode}
                    source={require("../../../assets/barcode.png")}
                  />
                </TouchableOpacity>
              </View>
            </>
          ) : null}

          <View style={styles.viewInput}>
            <DropDown
              placeholder={"Thiết bị"}
              data={dataDiaDiem}
              labelField={"label"}
              valueField={"value"}
              iconColor={colors.white}
            />
            <TouchableOpacity style={[styles.barcodeView]}>
              <Image
                style={styles.barcode}
                source={require("../../../assets/barcode.png")}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>
        <View style={styles.bodyContent}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index + ""}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => handleCard(index)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.cardContainer,
                      {
                        borderColor:
                          selectedIndexCard === index
                            ? colors.primary
                            : colors.border,
                        borderWidth: 1,
                        borderLeftWidth: 5,
                        borderLeftColor:
                          selectedIndexCard === index
                            ? colors.primary
                            : colors.gray,
                      },
                    ]}
                  >
                    <View style={styles.cardHeader}>
                      <View style={styles.leftHeader}>
                        <Text style={styles.textLeftHeader}>{item.NGAY}</Text>
                      </View>
                      <View style={styles.rightHeader}>
                        <Text style={styles.textRightHeader}>
                          {" "}
                          Số ngày ({item.SO_NGAY})
                        </Text>
                      </View>
                    </View>
                    <Line />
                    <View style={styles.cardbody}>
                      <View style={styles.content}>
                        <View style={styles.leftContent}>
                          <Text
                            style={[
                              styles.textLeftContent,
                              { fontWeight: "bold" },
                            ]}
                          >
                            {item.MS_TB}
                          </Text>
                        </View>
                        <View style={styles.rightContent}>
                          <Text
                            style={[
                              styles.textRightContent,
                              { fontWeight: "bold" },
                            ]}
                          >
                            {item.CONG_VIEC_BT}
                          </Text>
                        </View>
                      </View>
                      <View style={[styles.content]}>
                        <View style={[styles.leftContent, { flex: 1 }]}>
                          <Text
                            style={[
                              styles.textLeftContent,
                              { color: "#6c757d" },
                            ]}
                          >
                            {item.DIA_DIEM_1}
                          </Text>
                        </View>
                        <View style={[styles.rightContent, { flex: 1 }]}>
                          <Text
                            style={[
                              styles.textRightContent,
                              { color: "#6c757d" },
                            ]}
                          >
                            {item.DIA_DIEM_2}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View style={styles.fotterContent}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: colors.backgroundColor,
              borderWidth: 1,
              borderColor: colors.border,
              width: "100%",
              borderRadius: 5,
              marginVertical: 5,
            }}
          >
            <TouchableOpacity>
              <Ionicons name="chevron-back-outline" size={30} />
            </TouchableOpacity>
            <Text style={{ color: colors.black }}>1 of 137</Text>
            <TouchableOpacity>
              <Ionicons name="chevron-forward-outline" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <IconButton
          label={"Save"}
          nameicon="save"
          size={20}
          onPress={handleSave}
        />
        <IconButton label={"Hủy"} nameicon="close" size={20} />
      </View>
    </View>
  );
};

export default DeviceMove;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    backgroundColor: colors.backgroundColor,
  },
  content: {
    flex: 1,
  },
  headerContent: {},
  bodyContent: {
    flex: 2,
  },
  fotterContent: {
    paddingHorizontal: 50,
  },
  viewInput: {
    flex: 1,
  },
  control: {
    flex: 10,
    marginHorizontal: 10,
  },
  footer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  iconStyle: {
    borderWidth: 0.5,
    borderRadius: 5,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.primary,
  },
  barcodeView: {
    position: "absolute",
    right: 10,
    top: 2,
  },
  barcode: {
    width: 40,
    height: 40,
  },

  cardContainer: {
    flex: 1,
    marginVertical: 5,
    borderRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 5,
    backgroundColor: colors.white,
    padding: 10,
  },
  cardHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftHeader: {},
  textLeftHeader: {
    color: colors.black,
    fontSize: 14,
    fontWeight: "600",
  },
  rightHeader: {},
  textRightHeader: {
    color: colors.black,
    fontSize: 14,
    fontWeight: "600",
  },
  cardbody: {},
  content: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  leftContent: {
    flex: 1,
    height: "100%",
  },
  rightContent: {
    flex: 3,
    height: "100%",
  },
  textLeftContent: {
    color: colors.primary,
    flexShrink: 1,
    fontSize: 14,
  },
  textRightContent: {
    color: colors.black,
    flexShrink: 1,
    fontSize: 14,
  },
});
