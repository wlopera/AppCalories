/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isToday} from 'date-fns';

const MY_FOOD_KEY = '@myFood:key';
const MY_TODAY_FOOD_KEY = '@myTodayFood:key';

import {Meal} from '../types';

const useFoodStorage = () => {
  // Salvar informacion de las comidas
  const saveInfoToStorage = async (storageKey: string, meal: Meal) => {
    try {
      const currentSavedFood = await AsyncStorage.getItem(storageKey);

      if (currentSavedFood) {
        const currentSaveFoodParsed = JSON.parse(currentSavedFood);
        currentSaveFoodParsed.push(meal);

        await AsyncStorage.setItem(
          storageKey,
          JSON.stringify(currentSaveFoodParsed),
        );
        return Promise.resolve('Exito...');
      }

      await AsyncStorage.setItem(storageKey, JSON.stringify([meal]));
      return Promise.resolve('Exito...');
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject('Error...');
    }
  };

  // Obtener informacion de las comidas
  const getInfoToStorage = async (storageKey: string) => {
    try {
      const foods = await AsyncStorage.getItem(storageKey);
      if (foods) {
        return Promise.resolve(JSON.parse(foods));
      }

      return Promise.resolve({});
    } catch (error) {
      console.error('Error:', error);
      return Promise.reject('Error...');
    }
  };
  // Guardar comidas
  const hanleSaveFood = async (meal: Meal) => {
    try {
      const result = await saveInfoToStorage(MY_FOOD_KEY, meal);
      return result;
    } catch (error) {
      return error;
    }
  };

  //  Obtener comidas
  const hanleGetFood = async () => {
    try {
      const result = await getInfoToStorage(MY_FOOD_KEY);
      return result;
    } catch (error) {
      console.error('Error:', error);
      return error;
    }
  };

  // Guardar comidas x dia
  const handleSaveTodayFood = async (meal: Meal) => {
    try {
      const result = await saveInfoToStorage(MY_TODAY_FOOD_KEY, {
        ...meal,
        date: new Date().toISOString(),
      });
      return result;
    } catch (error) {
      return error;
    }
  };

  //  Obtener comidas x dia
  const handleGetTodayFood = async () => {
    try {
      let result = await getInfoToStorage(MY_TODAY_FOOD_KEY);
      result = result.filter(
        (meal: Meal) => meal.date && isToday(new Date(meal.date)),
      );
      return result;
    } catch (error) {
      console.error('Error:', error);
      return error;
    }
  };

  return {
    onSaveFood: hanleSaveFood,
    onGetFood: hanleGetFood,
    onSaveTodayFood: handleSaveTodayFood,
    onGetTodayFood: handleGetTodayFood,
  };
};

export default useFoodStorage;
