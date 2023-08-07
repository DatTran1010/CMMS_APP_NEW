import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  LayoutAnimation,
  KeyboardAvoidingView,
  Modal,
  Platform,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import {FontAwesome5} from '@expo/vector-icons';

import colors from '../../Common/colors';
import CustomTextInput from '../../components/TextInput';
import {heightTextInput, heightTextMedium} from '../../Common/dimentions';
import DropDown from '../../components/DropDown';

import CalendarCustom from '../../components/Calendar';
import HeaderApp from '../Home/HeaderApp';
import InListBaoTri from './InListBaoTri';
import ModalListPhuTung from './ModalListPhuTung';
const Maintenance = ({navigation}) => {
  const [dataDiaDiem, setDataDiaDiem] = useState([
    {label: 'Trong xưởng', value: 1},
    {label: 'Văn phòng', value: 2},
    {label: 'Nhà vệ sinh', value: 3},
    {label: 'Nhà Kho', value: 4},
    {label: 'Tầng Thượng', value: 5},
    {label: 'Sân Bãi', value: 6},
    {label: 'Cây dừa', value: 7},
    {label: 'Cây tre', value: 8},
  ]);

  const [data, setData] = useState([
    {id: 1, TEN_PHIEU: '01.01 Bơm mỡ bạc đạn'},
    {id: 2, TEN_PHIEU: '02 Kiểm tra cánh vít & vệ sinh'},
    {id: 3, TEN_PHIEU: '03 Kiểm tra và vệ sinh motor'},
  ]);

  const [dataDetail, setDataDetail] = useState([
    {id: 1, id_PT: 1, TEN_PT: 'COS-AC-011', value1: 1, value2: 2},
    {id: 1, id_PT: 2, TEN_PT: 'COS-AC-443', value1: 1, value2: 2},

    {id: 2, id_PT: 1, TEN_PT: 'COS-ST-009', value1: 1, value2: 2},
  ]);

  const [dataPhuTung, setDataPhuTung] = useState([
    {id_PT: 1, TEN_PT: 'COS-AC-011', SO_LUONG: 1, checked: false},
    {id_PT: 2, TEN_PT: 'COS-AC-443', SO_LUONG: 1, checked: false},
    {id_PT: 3, TEN_PT: 'COS-BO-008', SO_LUONG: 1, checked: false},
    {id_PT: 4, TEN_PT: 'COS-BO-011', SO_LUONG: 1, checked: false},
    {id_PT: 5, TEN_PT: 'COS-ST-009', SO_LUONG: 1, checked: false},
  ]);

  const [selectedID_MH, setSelectedID_MH] = useState(null);
  const [selectedID_PT, setSelectedID_PT] = useState(null);
  const [selectedIndexRows, setSelectedIndexRows] = useState(null);
  const [hiddenRows, setHiddenRows] = useState([]);

  const onPressOut = () => {
    setSelectedIndexRows(null);
  };

  const onPressInListPBT = index => {
    setSelectedIndexRows(index);
  };
  const handleItemListPBT = index => {
    // const updatedData = data.map((item) =>
    //     item.id === value.id
    //         ? { ...item, selected: true }
    //         : { ...item, selected: false }
    // );

    // Kiểm tra xem dòng có trong mảng hiddenRows chưa, nếu có thì ẩn đi, nếu không thì hiển thị
    if (hiddenRows.includes(index)) {
      setHiddenRows(hiddenRows.filter(rowIndex => rowIndex !== index));
    } else {
      setHiddenRows([...hiddenRows, index]);
    }

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const [showModalPT, setShowModalPT] = useState(false);
  const handleAddPhuTung = id_mh => {
    setShowModalPT(true);
    setSelectedID_MH(id_mh);
  };
  const handleClose = () => {
    setShowModalPT(false);
  };

  const handleCheckedPT = (value, dataIndex) => {
    const updateDataPhuTung = dataPhuTung.map(item =>
      item.id_PT === dataIndex.id_PT ? {...item, checked: value} : {...item},
    );
    setDataPhuTung(updateDataPhuTung);
  };

  const handleSavePhuTung = id_mh => {
    // Lọc ra các phần tử có checked là true trong dataPhuTung
    const selectedDataPhuTung = dataPhuTung.filter(item => item.checked);

    const newDataDetail = selectedDataPhuTung.map(item => ({
      id: id_mh,
      id_PT: item.id_PT,
      TEN_PT: item.TEN_PT,
      value1: item.SO_LUONG,
      value2: item.SO_LUONG,
    }));

    setDataDetail([...dataDetail, ...newDataDetail]);
    setShowModalPT(false);
  };

  // Tạo Animated.Value để điều khiển hiệu ứng
  const animatedValue = useRef(new Animated.Value(1)).current;

  const handleDeleteDataDetail = item => {
    const newDataDetail = dataDetail.filter(
      list =>
        list.id_PT.toString().concat(',', list.id.toString()) !==
        item.id_PT.toString().concat(',', item.id.toString()),
    );

    setSelectedID_MH(item.id);
    setSelectedID_PT(item.id_PT);

    // Bắt đầu Animated
    Animated.timing(animatedValue, {
      toValue: 0, // Điều khiển đến giá trị 0 (mục tiêu hiệu ứng Animated)
      duration: 500, // Thời gian thực hiện hiệu ứng
      useNativeDriver: true, // Sử dụng Native Driver cho hiệu ứng tối ưu hóa
    }).start(() => {
      // Khi hiệu ứng hoàn tất, cập nhật lại mảng dataArray và animatedValue
      setDataDetail(newDataDetail);
      animatedValue.setValue(1);
    });
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={86}>
      <View style={{flex: 1}}>
        <HeaderApp
          navigation={navigation}
          title="PHIẾU BẢO TRÌ"
          headerLeftVisible={true}
          goBack={true}
        />
        <View style={styles.control}>
          <ScrollView style={{flex: 1}}>
            <View style={styles.header}>
              <View style={styles.labelDevice}>
                <Text style={styles.textCodeDevice}>BAF-3508</Text>
                <Text style={styles.textNameDevice}>
                  Hệ thống lọc bụi JT05 (Máy nghiền HM01)
                </Text>
              </View>
              <View style={styles.line}></View>
            </View>
            <View style={styles.body}>
              <View style={styles.viewTextMachine}>
                <Text style={styles.textMachine}>WO-202308000007</Text>
                <Text style={styles.textMachine}>03/08/2023</Text>
              </View>
              <View style={styles.viewInput}>
                <DropDown
                  placeholder={'Loại bảo trì'}
                  data={dataDiaDiem}
                  labelField={'label'}
                  valueField={'value'}
                />
              </View>
              <View style={styles.viewInput}>
                <DropDown
                  placeholder={'Mức độ khẩn cấp'}
                  data={dataDiaDiem}
                  labelField={'label'}
                  valueField={'value'}
                />
              </View>
              <View style={styles.viewInput}>
                <CustomTextInput
                  placeholder={'Ghi chú'}
                  multiline
                  height={heightTextMedium}
                />
              </View>
              <View
                style={[
                  styles.viewInput,
                  {
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                  },
                ]}>
                <Text style={styles.textReason}>Cầu giao bị hỏng</Text>
                <TouchableOpacity style={styles.iconStyle}>
                  <Ionicons name="save" size={20} color={colors.primary} />
                </TouchableOpacity>
              </View>

              <View style={styles.line}></View>
              <View style={styles.listPhieuBaoTri}>
                {data.map((value, index) => (
                  <>
                    <View
                      key={index}
                      style={{
                        flex: 1,
                        position: 'relative',
                      }}>
                      {selectedIndexRows === index && (
                        <View style={styles.tooltipContainer}>
                          <Text style={styles.tooltipText}>
                            This is Tooltip
                          </Text>
                        </View>
                      )}
                      <TouchableOpacity
                        style={styles.listPBTDetail}
                        activeOpacity={0.5}
                        onPress={() => handleItemListPBT(index)}
                        onLongPress={() => onPressInListPBT(index)}
                        onPressOut={onPressOut}>
                        <View style={styles.leftListPBT}>
                          <Text> + {value.TEN_PHIEU}</Text>
                        </View>
                        <Animated.View style={styles.iconListPBT}>
                          <TouchableOpacity>
                            <Ionicons
                              name="link-outline"
                              size={20}
                              color={colors.primary}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity>
                            <Ionicons
                              name="move-outline"
                              size={20}
                              color={colors.primary}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity>
                            <Ionicons
                              name="trash-outline"
                              size={20}
                              color={colors.primary}
                            />
                          </TouchableOpacity>
                        </Animated.View>
                      </TouchableOpacity>
                    </View>
                    {hiddenRows.includes(index) && (
                      <View style={styles.hideInList}>
                        <View>
                          {dataDetail.map(
                            (valueDetail, index) =>
                              value.id === valueDetail.id && (
                                <InListBaoTri
                                  key={index}
                                  data={valueDetail}
                                  onDelete={handleDeleteDataDetail}
                                  animatedValue={animatedValue}
                                  id_MH={selectedID_MH}
                                  id_PT={selectedID_PT}
                                />
                              ),
                          )}
                        </View>
                        <View style={styles.iconHideInList}>
                          <TouchableOpacity
                            style={styles.iconStyle}
                            onPress={() => handleAddPhuTung(value.id)}>
                            <Ionicons
                              name="add-outline"
                              size={20}
                              color={colors.primary}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.iconStyle}>
                            <Ionicons
                              name="save"
                              size={20}
                              color={colors.primary}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.iconStyle}>
            <Ionicons name="add-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconStyle}>
            <Ionicons name="warehouse" size={20} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconStyle}>
            <Ionicons name="time-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconStyle}>
            <Ionicons
              name="checkmark-circle-outline"
              size={20}
              color={colors.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconStyle}>
            <Ionicons name="close" size={20} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconStyle}>
            <Ionicons
              name="person-add-outline"
              size={20}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ModalListPhuTung
        data={dataPhuTung}
        isShow={showModalPT}
        onClose={handleClose}
        onChecked={handleCheckedPT}
        onSave={handleSavePhuTung}
        id_MH={selectedID_MH}
      />
    </KeyboardAvoidingView>
  );
};

export default Maintenance;

const styles = StyleSheet.create({
  tooltipContainer: {
    position: 'absolute',
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 4,
    top: -30, // Change this value based on your design
    left: 0,
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: colors.backgroundColor,
  },
  header: {
    marginBottom: 10,
    flex: 1,
  },
  labelDevice: {
    flexDirection: 'row',
  },
  textCodeDevice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    paddingRight: 10,
  },
  textNameDevice: {
    fontSize: 16,
    fontWeight: 'bold',
    flexShrink: 1,
  },

  viewTextMachine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },

  textMachine: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.black,
  },
  textReason: {
    fontSize: 16,
    fontWeight: '400',
  },
  listPhieuBaoTri: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  listPBTDetail: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    backgroundColor: colors.white,
    borderRadius: 5,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
    borderColor: colors.border,
    borderWidth: 1,
    height: heightTextInput,
  },

  leftListPBT: {
    flex: 4,
  },
  iconListPBT: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  hideInList: {
    flex: 1,
    display: 'flex',
  },
  iconHideInList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  line: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  body: {
    flex: 10,
  },
  viewInput: {
    marginVertical: 5,
  },
  control: {
    marginHorizontal: 10,
    flex: 9,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  iconStyle: {
    borderWidth: 0.5,
    borderRadius: 5,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.primary,
    marginHorizontal: 5,
  },
});
