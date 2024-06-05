/* eslint-disable prettier/prettier */
import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import TotalItem from '../components/TotalItem';
import {TodayCaloriesProps} from '../types';
import {Text} from 'react-native';

const TodayCalories: FC<TodayCaloriesProps> = ({
  total = 0,
  consumed = 0,
  remaing = 0,
  percentage = 0,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <CircularProgress value={percentage} valueSuffix="%" duration={2000} />
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.today}>Hoy</Text>
        <TotalItem legend="Total" value={total} />
        <TotalItem legend="Consumido" value={consumed} />
        <TotalItem legend="Restante" value={remaing} />
      </View>
    </View>
  );
};

export default TodayCalories;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  leftContainer: {flex: 1},
  rightContainer: {flex: 1, justifyContent: 'center'},
  today: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 14,
    color: '#000',
  },
});
