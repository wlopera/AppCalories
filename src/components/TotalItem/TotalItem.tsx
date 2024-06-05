/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {TotalItemProps} from '../../types';

const TotalItem: FC<TotalItemProps> = ({legend, value}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.legend}>{legend}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

export default TotalItem;

const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'row', marginBottom: 8, paddingRight: 8},
  leftContainer: {flex: 1},
  rightContainer: {flex: 1, alignItems: 'flex-end'},
  legend: {fontSize: 15, fontWeight: '700'},
  value: {fontSize: 16, fontWeight: '900'},
});
