/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useCallback, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button, Icon} from '@rneui/themed';
import {StackNavigationProp} from '@react-navigation/stack';

import Header from '../../components/Header';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Meal, RootStackParamsList, TodayCaloriesProps} from '../../types';
import useFoodStorage from '../../hooks/useFoodStorage';
import TodayCalories from '../../TodayCalories';

const TOTAL_CALORIES_PER_PERSON = 2000;

const Home = () => {
  const [todayFood, setTodayFood] = useState<Meal[]>([]);
  const [todayStatistics, setTodayStatistics] = useState<TodayCaloriesProps>();

  const {onGetTodayFood} = useFoodStorage();

  const {navigate} =
    useNavigation<StackNavigationProp<RootStackParamsList, 'Home'>>();

  const handleAddCaloriesPress = () => {
    navigate('AddFood');
  };

  const calculateTodayStatistics = (meals: Meal[]) => {
    try {
      const caloriesConsumed = meals.reduce(
        (acum, curr) => acum + Number(curr.calories),
        0,
      );
      const remainingCalories = TOTAL_CALORIES_PER_PERSON - caloriesConsumed;
      const percentage = (caloriesConsumed / TOTAL_CALORIES_PER_PERSON) * 100;

      setTodayStatistics({
        total: TOTAL_CALORIES_PER_PERSON,
        consumed: caloriesConsumed,
        remaing: remainingCalories,
        percentage,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const loadTodayFood = useCallback(async () => {
    try {
      //const todayFoodResponse = (await onGetTodayFood()) as Meal[];
      const todayFoodResponse = await onGetTodayFood();
      calculateTodayStatistics(todayFoodResponse);

      setTodayFood(todayFoodResponse);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTodayFood().catch(null);
    }, [loadTodayFood]),
  );

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.caloriasContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.caloriesLegend}>Calorias</Text>
        </View>
        <View style={styles.rightContainer}>
          <Button
            icon={
              <Icon
                name="add-circle-outline"
                type="material"
                size={35}
                color="#FFF"
              />
            }
            radius="lg"
            color="#4ECB71"
            onPress={handleAddCaloriesPress}
          />
        </View>
      </View>
      <TodayCalories {...todayStatistics} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#FFF',
    flex: 1,
  },
  caloriasContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  caloriesLegend: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
