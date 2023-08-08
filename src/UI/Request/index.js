import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
// import Checkbox from "expo-checkbox";
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from '../../Common/colors';
import CustomTextInput from '../../components/TextInput';
import {heightTextArea, windowHeight} from '../../Common/dimentions';
import DropDown from '../../components/DropDown';
import CalendarCustom from '../../components/Calendar';
import HeaderApp from '../Home/HeaderApp';
import Checkbox from '../../components/Checkbox';
const Request = ({navigation}) => {
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

  const [mayHong, setMayHong] = useState(false);
  const [dateMayHong, setDateMayHong] = useState(new Date());
  const setDateDNgay = date => {
    setDateMayHong(date);
  };
  const handleCheckMayHong = () => {
    setMayHong(!mayHong);
  };
  return (
    <View style={styles.container}>
      <HeaderApp
        navigation={navigation}
        title="YÊU CẦU BẢO TRÌ"
        headerLeftVisible={true}
        goBack={true}
      />
      <View style={styles.control}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.header}>
            <View style={styles.labelDevice}>
              <Text style={styles.textCodeDevice}>AIC-0003</Text>
              <Text style={styles.textNameDevice}>Máy lạnh 3</Text>
            </View>
            <View style={styles.line}></View>
          </View>
          <View style={styles.body}>
            <View style={styles.viewInput}>
              <CustomTextInput
                placeholder={'Mô tả tình trạng'}
                multiline
                height={heightTextArea}
              />
            </View>
            <View style={styles.viewInput}>
              <CustomTextInput
                placeholder={'Yêu cầu'}
                multiline
                height={heightTextArea}
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
              <DropDown
                placeholder={'Nguyên nhân'}
                data={dataDiaDiem}
                labelField={'label'}
                valueField={'value'}
              />
            </View>
            <View style={[styles.viewInput]}>
              <Checkbox
                label="Máy hỏng"
                value={mayHong}
                onPress={handleCheckMayHong}
              />
            </View>
            {mayHong && (
              <View style={[styles.viewInput]}>
                <CalendarCustom
                  format={'DD/MM/YYYY hh:mm:ss'}
                  mode="datetime"
                  placeholder={'Đến ngày'}
                  date={dateMayHong}
                  setDateDNgay={setDateDNgay}
                />
              </View>
            )}

            <View
              style={[
                styles.viewInput,
                {flexDirection: 'row', alignItems: 'center'},
              ]}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Ionicons name="camera" size={25} />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '300',
                    paddingLeft: 10,
                  }}>
                  Thêm hình
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.iconStyle}>
          <Ionicons name="save" size={20} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconStyle}>
          <Ionicons name="close" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Request;

const styles = StyleSheet.create({
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
    justifyContent: 'space-evenly',
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
  },
});
