import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import Checkbox from 'expo-checkbox';
import Checkbox from '../../components/Checkbox';
import colors from '../../Common/colors';
import Line from '../../components/Line.js';
import {heightTextInput} from '../../Common/dimentions';
const ModalListPhuTung = ({
  id_MH,
  data,
  isShow = false,
  onClose,
  onChecked,
  onSave,
}) => {
  return (
    <Modal visible={isShow} transparent={true} animationType="fade">
      <TouchableOpacity activeOpacity={1} style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <View style={styles.containerHeader}>
              <Text style={styles.textHeader}>Thêm vật tư phụ tùng</Text>
              <TouchableOpacity onPress={() => onClose()}>
                <Ionicons name="close" size={30} color={colors.gray} />
              </TouchableOpacity>
            </View>
          </View>
          <Line />
          <View style={styles.body}>
            <ScrollView style={{flex: 1}}>
              {data.map(item => (
                <>
                  <View key={item.id_PT} style={styles.listPhuTung}>
                    <View style={styles.leftList}>
                      <Text style={styles.textbody}>{item.TEN_PT}</Text>
                    </View>
                    <View style={styles.rightList}>
                      <View style={{flex: 1}}>
                        <Text style={styles.textbody}>{item.SO_LUONG}</Text>
                      </View>

                      <TouchableOpacity
                        style={{
                          flex: 3,
                          alignItems: 'flex-end',
                        }}>
                        {/* <Checkbox
                          value={item.checked}
                          color={colors.primary}
                          onValueChange={(value) => onChecked(value, item)}
                          style={{ flex: 1 }}
                        /> */}
                        <Checkbox
                          label=""
                          value={item.checked}
                          onPress={() => onChecked(item)}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Line />
                </>
              ))}
            </ScrollView>
          </View>
          <View style={styles.fotter}>
            <TouchableOpacity
              style={[styles.closeButton, {marginRight: 10}]}
              activeOpacity={0.5}
              onPress={() => onClose()}>
              <Text style={styles.textClose}>Đóng</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.saveButton}
              onPress={() => onSave(id_MH)}>
              <Text style={styles.textSave}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalListPhuTung;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    height: '60%',
    borderRadius: 10,
    padding: 15,
  },
  header: {
    flex: 1,
  },
  body: {
    flex: 8,
  },
  fotter: {
    flex: 1,
    justifyContent: 'space-around',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  containerHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textHeader: {
    fontSize: 18,
    fontWeight: '400',
  },
  listPhuTung: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
  },
  rightList: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  leftList: {
    flex: 5,
  },
  textbody: {
    fontSize: 14,
    fontWeight: '400',
  },
  closeButton: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: heightTextInput - 10,
    backgroundColor: colors.white,
  },
  saveButton: {
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: heightTextInput - 10,
    backgroundColor: colors.primary,
  },
  textClose: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '400',
  },
  textSave: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '400',
  },
});
