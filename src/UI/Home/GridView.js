import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import colors from "../../Common/colors";
import { windowHeight } from "../../Common/dimentions";
import IconInCircle from "../../components/IconInCircle";
const GridView = ({ data, handleYeuCau, handleBaoTri, handleGiamSat }) => {
  const [refreshing, setRefreshing] = useState(false);

  const columnsName = () => (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignContent: "center",
          height: windowHeight / 25,
          borderBottomWidth: 1,
          backgroundColor: colors.backgroundColor,
        }}
      >
        <TouchableOpacity
          style={{ ...styles.columnHeader, flex: 3 }}
          onPress={() => sortTable()}
        >
          <Text style={styles.columnHeaderTxt}>Mã thiết bị</Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 5,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{ ...styles.columnHeader, flex: 1 }}
            onPress={() => sortTable()}
          >
            <Text style={styles.columnHeaderTxt}>Yêu cầu</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ ...styles.columnHeader, flex: 1 }}
            onPress={() => sortTable()}
          >
            <Text style={styles.columnHeaderTxt}>Bảo trì</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ ...styles.columnHeader, flex: 1 }}
            onPress={() => sortTable()}
          >
            <Text style={styles.columnHeaderTxt}>Giám sát</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  const handleRowGrid = (event, index, item) => {
    const { pageX, pageY } = event.nativeEvent;
    setTooltipPosition({ x: pageX, y: pageY });
    setFocusIndex(index);
    setContentToolTip(item.teN_MAY);
  };

  const handleLongPressRowGrid = (index) => {
    setSelectedIndexRow(index);
  };
  const unHandleRowGrid = () => {
    setFocusIndex(-1);
    setVisibleToolTip(false);
  };

  //#region toolTip
  const [visibleToolTip, setVisibleToolTip] = useState(false); //set ẩn hiện tooltip
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 }); // lấy vị trí của tooltip (không sử dụng nữa)
  const [contentToolTip, setContentToolTip] = useState("");
  const [selectedIndexRow, setSelectedIndexRow] = useState(null);
  //#endregion

  //focus vào dòng đổi màu, lấy index
  const [focusIndex, setFocusIndex] = useState(-1);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(false);
        }}
        data={data}
        stickyHeaderHiddenOnScroll={[0]}
        keyExtractor={(item, index) => index + ""}
        ListHeaderComponent={columnsName}
        stickyHeaderIndices={[0]}
        renderItem={({ item, index, event }) => {
          return (
            <TouchableNativeFeedback
              onPress={(event) => handleRowGrid(event, index, item)}
              onLongPress={() => handleLongPressRowGrid(index)}
              onPressOut={() => {
                setSelectedIndexRow(null);
              }}
              style={{ flex: 1 }}
            >
              <View
                style={{
                  ...styles.styleRows,
                  backgroundColor:
                    focusIndex === index
                      ? "#ff870f40"
                      : index % 2 == 1
                      ? "#f2f2f2"
                      : "white",
                }}
              >
                {selectedIndexRow === index && (
                  <View
                    style={[
                      styles.tooltipContainer,
                      {
                        top: -13, // Change this value based on your design
                      },
                    ]}
                  >
                    <Text style={styles.tooltipText}>{item.teN_MAY}</Text>
                  </View>
                )}
                <View
                  style={{
                    flex: 3,
                    alignItems: "center",
                  }}
                >
                  {/* {focusIndex === index && visibleToolTip && (
                    <TouchableOpacity
                      style={[
                        styles.tooltipContainer,
                        {
                          top: -10,
                          left: 5,
                          position: "relative",
                          backgroundColor: "#113186",
                          width: "100%",
                          borderRadius: 10,
                          padding: 5,
                        },
                      ]}
                      onPress={() => {
                        setVisibleToolTip(false);
                      }}
                    >
                      <Text style={{ color: colors.white }}>
                        {contentToolTip}
                      </Text>
                    </TouchableOpacity>
                  )} */}

                  <Text
                    style={{
                      ...styles.colMSMay,
                    }}
                  >
                    {item?.mS_MAY}
                  </Text>
                </View>
                <View style={styles.columnValue}>
                  <View style={styles.iconStyle}>
                    {item.listYC ? (
                      item.listYC.map((value) => (
                        <TouchableOpacity
                          style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onPress={() => handleYeuCau(item)}
                        >
                          {value.muC_YC === 1 ? (
                            value.treyc === 1 ? (
                              value.duyeT_YC === 1 ? (
                                <IconInCircle
                                  size={20}
                                  color={"#ff0000"}
                                  text="A"
                                />
                              ) : (
                                <IconInCircle
                                  size={20}
                                  color={"#ff0000"}
                                  text="N"
                                />
                              )
                            ) : value.duyeT_YC === 1 ? (
                              <IconInCircle
                                size={20}
                                color={"#ff0000"}
                                text="A"
                              />
                            ) : (
                              <IconInCircle
                                size={20}
                                color={"#ff0000"}
                                text="N"
                              />
                            )
                          ) : value.muC_YC === 2 ? (
                            value.treyc === 1 ? (
                              value.duyeT_YC === 1 ? (
                                <IconInCircle
                                  size={20}
                                  color={"#13079b"}
                                  text="A"
                                />
                              ) : (
                                <IconInCircle
                                  size={20}
                                  color={"#13079b"}
                                  text="N"
                                />
                              )
                            ) : value.duyeT_YC === 1 ? (
                              <IconInCircle
                                size={20}
                                color={"#13079b"}
                                text="A"
                              />
                            ) : (
                              <IconInCircle
                                size={20}
                                color={"#13079b"}
                                text="N"
                              />
                            )
                          ) : value.treyc === 1 ? (
                            value.duyeT_YC === 1 ? (
                              <IconInCircle
                                size={20}
                                color={"#008001"}
                                text="A"
                              />
                            ) : (
                              <IconInCircle
                                size={20}
                                color={"#008001"}
                                text="N"
                              />
                            )
                          ) : value.duyeT_YC === 1 ? (
                            <IconInCircle
                              size={20}
                              color={"#008001"}
                              text="A"
                            />
                          ) : (
                            <IconInCircle
                              size={20}
                              color={"#008001"}
                              text="N"
                            />
                          )}
                        </TouchableOpacity>
                      ))
                    ) : (
                      <TouchableOpacity onPress={() => handleYeuCau(item)}>
                        <Ionicons
                          name="close-outline"
                          size={20}
                          color="#fff0"
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={styles.iconStyle}>
                    {item.listBT ? (
                      item.listBT.map((value) => (
                        <TouchableOpacity
                          style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onPress={() => handleBaoTri(item)}
                        >
                          {value.muC_BT === 1 ? (
                            value.trebt === 1 ? (
                              value.hH_BT === 1 ? (
                                <IconInCircle
                                  size={20}
                                  color={"#ff0000"}
                                  text="C"
                                />
                              ) : (
                                <IconInCircle
                                  size={20}
                                  color={"#ff0000"}
                                  text="P"
                                />
                              )
                            ) : value.hH_BT === 1 ? (
                              <IconInCircle
                                size={20}
                                color={"#ff0000"}
                                text="C"
                              />
                            ) : (
                              <IconInCircle
                                size={20}
                                color={"#ff0000"}
                                text="P"
                              />
                            )
                          ) : value.muC_BT === 2 ? (
                            value.trebt === 1 ? (
                              value.hH_BT === 1 ? (
                                <IconInCircle
                                  size={20}
                                  color={"#13079b"}
                                  text="C"
                                />
                              ) : (
                                <IconInCircle
                                  size={20}
                                  color={"#13079b"}
                                  text="P"
                                />
                              )
                            ) : value.hH_BT === 1 ? (
                              <IconInCircle
                                size={20}
                                color={"#13079b"}
                                text="C"
                              />
                            ) : (
                              <IconInCircle
                                size={20}
                                color={"#13079b"}
                                text="P"
                              />
                            )
                          ) : value.trebt === 1 ? (
                            value.hH_BT === 1 ? (
                              <IconInCircle
                                size={20}
                                color={"#008001"}
                                text="C"
                              />
                            ) : (
                              <IconInCircle
                                size={20}
                                color={"#008001"}
                                text="P"
                              />
                            )
                          ) : value.hH_BT === 1 ? (
                            <IconInCircle
                              size={20}
                              color={"#008001"}
                              text="C"
                            />
                          ) : (
                            <IconInCircle
                              size={20}
                              color={"#008001"}
                              text="P"
                            />
                          )}
                        </TouchableOpacity>
                      ))
                    ) : (
                      <TouchableOpacity
                        onPress={() => handleBaoTri(item)}
                        style={{}}
                      >
                        <Ionicons
                          name="close-outline"
                          size={20}
                          color="#fff0"
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={styles.iconStyle}>
                    <TouchableOpacity onPress={() => handleGiamSat(item)}>
                      {item.tregs === 2 ? (
                        <Ionicons
                          name="close-outline"
                          size={30}
                          color="#13079b"
                        />
                      ) : item.tregs === 1 ? (
                        <Ionicons
                          name="close-outline"
                          size={30}
                          color="#fff0"
                        />
                      ) : null}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableNativeFeedback>
          );
        }}
      />
    </View>
  );
};

export default GridView;
const styles = StyleSheet.create({
  container: {
    paddingTop: windowHeight / 40,
    flex: 1,
  },
  columnHeader: {
    alignItems: "center",
    justifyContent: "center",
  },
  styleRows: {
    flexDirection: "row",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  iconStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  colMSMay: {
    fontSize: 15,
    fontWeight: "400",
    justifyContent: "center",
  },
  columnValue: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 5,
  },
  columnHeaderTxt: {
    textAlign: "center",
    fontWeight: "400",
  },

  tooltipContainer: {
    position: "absolute",
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 4,
    left: 10,
  },
});
