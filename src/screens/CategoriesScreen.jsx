import React from "react";
import { FlatList, View } from "react-native";
import CategoryGridTile from "../components/CategoryGridTile";
import { CATEGORIES } from "../data/data";

function renderCategoryItem({ item, navigation }) {
  const onPressHandler = () => {
    navigation.navigate("MealsOverview", {
      categoryId: item.id,
    });
  };

  return (
    <CategoryGridTile
      title={item.title}
      color={item.color}
      onPress={onPressHandler}
    />
  );
}

function CategoriesScreen({ navigation }) {
  return (
    <FlatList
      data={CATEGORIES}
      renderItem={({ item }) => renderCategoryItem({ item, navigation })}
      numColumns={2}
    />
  );
}

export default CategoriesScreen;
