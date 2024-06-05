/* eslint-disable prettier/prettier */
export type RootStackParamsList = {
  Home: undefined;
  AddFood: undefined;
};

export type Meal = {
  calories: string;
  name: string;
  portion: string;
  date?: string;
};

export type InputItemProps = {
  legend: string;
  value: string;
  onChange: (text: string) => void;
};

export type TotalItemProps = {
  legend: string;
  value: number | string;
};

export type TodayCaloriesProps = {
  total?: number | string;
  consumed?: number | string;
  remaing?: number | string;
  percentage?: number | string;
};
