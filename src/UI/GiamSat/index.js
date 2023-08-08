import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState, useRef} from 'react';
// import Checkbox from "expo-checkbox";
import Checkbox from '../../components/Checkbox';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from '../../Common/colors';
import CustomTextInput from '../../components/TextInput';
import {heightTextInput, heightTextMedium} from '../../Common/dimentions';
import DropDown from '../../components/DropDown';

import CalendarCustom from '../../components/Calendar';
import HeaderApp from '../Home/HeaderApp';
import InListGiamSat from '../GiamSat/InListGiamSat.js';
import RadioButton from '../../components/RadioButton';
import ModalAddImage from './ModalAddImage';
import IconButton from '../../components/IconButton';

const Monitor = ({navigation}) => {
  const [data, setData] = useState([
    {id: 1, TEN_PHIEU: '01.01.02 Nhiệt độ lò hơi'},
    {id: 2, TEN_PHIEU: '01.02.01 Current check'},
  ]);

  const [dataDetail, setDataDetail] = useState([
    {id: 1, id_PT: 1, TINH_TRANG: 'Độ C'},
    {id: 2, id_PT: 1, TINH_TRANG: 'Ampe'},
  ]);

  const [selectedIndexRows, setSelectedIndexRows] = useState(null);
  const [hiddenRows, setHiddenRows] = useState([]);
  const [checkedHideDetail, setCheckedHideDetail] = useState(true);

  const onPressOut = () => {
    setSelectedIndexRows(null);
  };

  const onPressInListGiamSat = index => {
    setSelectedIndexRows(index);
  };

  const handleItemListGiamSat = index => {
    // Kiểm tra xem dòng có trong mảng hiddenRows chưa, nếu có thì ẩn đi, nếu không thì hiển thị
    if (hiddenRows.includes(index)) {
      setHiddenRows(hiddenRows.filter(rowIndex => rowIndex !== index));
    } else {
      setHiddenRows([...hiddenRows, index]);
    }

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const handleCheckedHideDetail = () => {
    const newCheckedHideDetail = !checkedHideDetail;

    console.log(newCheckedHideDetail);
    setCheckedHideDetail(newCheckedHideDetail);
    const newHiddenRows = data.map((_, index) => index);

    setHiddenRows(newCheckedHideDetail ? [] : newHiddenRows);
    console.log(hiddenRows);

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };
  //#region  Xử lý radio button
  const optionsRadio = [
    {
      id: 1,
      label: 'Những thông số đến hạn',
    },
    {
      id: 2,
      label: 'Tất cả',
    },
  ];

  const [selectedOption, setSelectedOption] = useState({1: true});

  const handleSelectedOption = optionId => {
    setSelectedOption({[optionId]: true});
  };

  //   console.log(parseInt(Object.keys(selectedOption)[0]));

  //#endregion

  //#region  xử lý MODAL ADD IMAGE
  const [showModalAddImage, setShowModalAddImage] = useState(false);
  const handleCloseModal = () => {
    setShowModalAddImage(false);
  };

  const handleShowModalAddImage = () => {
    setShowModalAddImage(true);
  };

  //#endregion
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={86}>
      <View style={{flex: 1}}>
        <HeaderApp
          navigation={navigation}
          title="GIÁM SÁT TÌNH TRẠNG MÁY"
          headerLeftVisible={true}
          goBack={true}
        />
        <View style={styles.control}>
          <ScrollView style={{flex: 1}}>
            <View style={styles.header}>
              <View style={styles.labelDevice}>
                <Text style={styles.textCodeDevice}>HAM-0010</Text>
                <Text style={styles.textNameDevice}>Coarse Grinding - 562</Text>
              </View>
              <View style={styles.line}></View>
            </View>
            <View style={styles.body}>
              {optionsRadio.map(option => (
                <View key={option.id} style={styles.viewInput}>
                  <RadioButton
                    label={option.label}
                    onSelected={() => handleSelectedOption(option.id)}
                    selected={selectedOption[option.id]}
                  />
                </View>
              ))}
              <View style={styles.viewInput}>
                <Checkbox
                  label="Ẩn chi tiết"
                  value={checkedHideDetail}
                  onPress={handleCheckedHideDetail}
                />
              </View>

              <View style={styles.line}></View>

              <View style={styles.listPhieuGiamSat}>
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
                        style={styles.listGiamSatDetail}
                        activeOpacity={0.5}
                        onPress={() => handleItemListGiamSat(index)}
                        onLongPress={() => onPressInListGiamSat(index)}
                        onPressOut={onPressOut}>
                        <View style={styles.leftListGiamSat}>
                          <Text> + {value.TEN_PHIEU}</Text>
                        </View>
                        <Animated.View style={styles.iconListGiamSat}>
                          <TouchableOpacity onPress={handleShowModalAddImage}>
                            <Ionicons
                              name="camera"
                              size={25}
                              color={colors.primary}
                            />
                          </TouchableOpacity>
                        </Animated.View>
                      </TouchableOpacity>
                    </View>
                    {hiddenRows.includes(index) && (
                      <Animated.View style={styles.hideInList}>
                        <View>
                          {dataDetail.map(
                            (valueDetail, index) =>
                              value.id === valueDetail.id && (
                                <InListGiamSat key={index} data={valueDetail} />
                              ),
                          )}
                        </View>
                      </Animated.View>
                    )}
                  </>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.iconStyle}>
            <IconButton nameicon={'save'} label={'Lưu'} size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconStyle}>
            <IconButton nameicon={'close'} label={'Hủy'} size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <ModalAddImage isShow={showModalAddImage} onClose={handleCloseModal} />
    </KeyboardAvoidingView>
  );
};

export default Monitor;

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

  checkHideDetail: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textReason: {
    fontSize: 16,
    fontWeight: '400',
  },
  listPhieuGiamSat: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  listGiamSatDetail: {
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

  leftListGiamSat: {
    flex: 4,
  },
  iconListGiamSat: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
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
