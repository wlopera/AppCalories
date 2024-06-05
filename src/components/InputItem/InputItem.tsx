/* eslint-disable prettier/prettier */
import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Input} from '@rneui/themed';
import {InputItemProps} from '../../types';

const InputItem: FC<InputItemProps> = ({legend, value, onChange}) => {
  return (
    <View style={styles.formItem}>
      <View style={styles.inputContainer}>
        <Input value={value} onChangeText={(text: string) => onChange(text)} />
      </View>
      <View style={styles.legendContainer}>
        <Text style={styles.legend}>{legend}</Text>
      </View>
    </View>
  );
};

export default InputItem;

const styles = StyleSheet.create({
  formItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 2,
  },
  legendContainer: {
    flex: 1,
  },
  legend: {
    fontWeight: 'bold',
  },
});
