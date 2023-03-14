import React, { useLayoutEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import MealItem from "../components/MealItem";
import { CATEGORIES, MEALS } from "../data/data";

function MealsOverviewScreen({ route, navigation }) {
  const { categoryId } = route.params;

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === categoryId
    ).title;

    navigation.setOptions({
      title: categoryTitle,
    });
  }, [categoryId, navigation]);

  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(categoryId) >= 0;
  });

  const renderMealItem = ({ item }) => {
    return <MealItem item={item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList data={displayedMeals} renderItem={renderMealItem} />
    </View>
  );
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
