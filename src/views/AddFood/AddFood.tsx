/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Alert, ScrollView} from 'react-native';
import Header from '../../components/Header';
import {Button, Icon, Input} from '@rneui/themed';
import AddFoodModal from '../../components/AddFoodModal';
import useFoodStorage from '../../hooks/useFoodStorage';
import {Meal} from '../../types';
import MealItem from '../../components/MealItem';

const AddFood = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [foods, setFoods] = useState<Meal[]>([]);
  const [search, setSearch] = useState('');

  const {onGetFood} = useFoodStorage();

  const loadFoods = async () => {
    try {
      const foodsResponse = await onGetFood();
      setFoods(foodsResponse);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    loadFoods().catch(null);
  }, []);

  const handleModalClose = (shouldUpdate?: boolean) => {
    if (shouldUpdate) {
      Alert.alert('Comida guardada exitosamente...!');
      loadFoods();
    }
    setIsVisible(false);
  };

  const handleSearchPress = async () => {
    try {
      const result = await onGetFood();
      setFoods(
        result.filter((item: Meal) =>
          item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
        ),
      );
    } catch (error) {
      console.error(error);
      setFoods([]);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.addFoodContainer}>
        <View style={styles.legendContainer}>
          <Text style={styles.addFoodLegend}>Agregar Comida</Text>
        </View>
        <View style={styles.addFoodBtnContainer}>
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
            onPress={() => setIsVisible(true)}
          />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Manzana, torta, soda..."
            value={search}
            onChangeText={(text: string) => setSearch(text)}
          />
        </View>
        <Button
          title="Buscar"
          color="#ADE8AF"
          titleStyle={styles.searchBtnTitle}
          radius="lg"
          onPress={handleSearchPress}
        />
      </View>
      <ScrollView style={styles.content}>
        {foods?.map(meal => (
          <MealItem key={`my-meal-item-${meal.name}`} {...meal} />
        ))}
      </ScrollView>
      <AddFoodModal onShow={isVisible} onClose={handleModalClose} />
    </View>
  );
};

export default AddFood;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#FFF',
    flex: 1,
  },
  addFoodContainer: {
    flexDirection: 'row',
    textAlignVertical: 'center',
    marginVertical: 24,
  },
  legendContainer: {
    flex: 1,
  },
  addFoodLegend: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  addFoodBtnContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  searchContainer: {flexDirection: 'row'},
  inputContainer: {flex: 1, marginLeft: -12},
  searchBtnTitle: {
    color: '#000',
  },
  content: {},
});
