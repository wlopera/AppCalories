/* eslint-disable prettier/prettier */
import {Button, Icon} from '@rneui/themed';
import React, {FC, useEffect, useState} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import InputItem from '../InputItem/InputItem';
import useFoodStorage from '../../hooks/useFoodStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AddFoodModalProps = {
  onShow: boolean;
  onClose: (shouldUpdate?: boolean) => void;
};
const AddFoodModal: FC<AddFoodModalProps> = ({onShow, onClose}) => {
  const [calories, setCalories] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [portion, setPortion] = useState<string>('');
  const {onSaveFood} = useFoodStorage();

  useEffect(() => {
    setCalories('');
    setName('');
    setPortion('');
  }, [onShow]);

  const handleAddFoodPress = async () => {
    try {
      await onSaveFood({calories, name, portion});
    } catch (error) {}
    onClose(true);
  };

  return (
    <Modal
      visible={onShow}
      onRequestClose={() => onClose(false)}
      transparent
      animationType="slide">
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.closeContainer}>
            <Button
              icon={<Icon name="close" size={28} />}
              onPress={() => onClose(false)}
              type="clear"
            />
          </View>
          <InputItem legend="CAL" value={calories} onChange={setCalories} />
          <InputItem legend="Nombre" value={name} onChange={setName} />
          <InputItem legend="Porción" value={portion} onChange={setPortion} />
          <View style={styles.buttonContainer}>
            <Button
              title="Agregar"
              icon={<Icon name="add" color="#FFF" />}
              color="#4ECB71"
              radius="lg"
              onPress={handleAddFoodPress}
              disabled={
                calories.trim() === '' ||
                name.trim() === '' ||
                portion.trim() === ''
              }
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddFoodModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    width: '75%',
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  closeContainer: {
    alignItems: 'flex-end',
  },
  buttonContainer: {
    alignItems: 'flex-end',
  },
});
