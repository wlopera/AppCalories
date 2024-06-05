/* eslint-disable prettier/prettier */
import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Meal} from '../../types';
import {Button, Icon} from '@rneui/themed';
import useFoodStorage from '../../hooks/useFoodStorage';

const MealItem: FC<Meal> = ({calories, name, portion}) => {
  const {onSaveTodayFood} = useFoodStorage();

  const handleAddItemPress = async () => {
    try {
      await onSaveTodayFood({calories, name, portion});
      Alert.alert('Comida agregada al día...!');
    } catch (error) {
      console.error(error);
      Alert.alert('Comida no agregada al día...!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.portion}>{portion}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Button
          icon={<Icon name="add-circle-outline" />}
          type="clear"
          style={styles.iconBotton}
          onPress={handleAddItemPress}
        />
        <Text style={styles.calories}>{calories} cal</Text>
      </View>
    </View>
  );
};

export default MealItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ADE8AF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
  },
  leftContainer: {flex: 1, justifyContent: 'center'},
  rightContainer: {flex: 1, justifyContent: 'center', alignItems: 'flex-end'},
  name: {fontSize: 18, fontWeight: '900'},
  portion: {fontSize: 15, color: '#808080', fontWeight: '700'},
  calories: {fontSize: 18, fontWeight: '700'},
  iconBotton: {marginBottom: -8},
});
