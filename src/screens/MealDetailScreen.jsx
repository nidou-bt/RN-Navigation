import React, { useCallback, useEffect, useLayoutEffect, useMemo } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import List from "../components/meal-detail/List";
import Subtitle from "../components/meal-detail/Subtitle";
import MealDetails from "../components/MealDetails";
import IconButton from "../components/UI/IconButton";
import { MEALS } from "../data/data";
import useFavorites from "../store/context/favorites-context";


function MealDetailScreen({ route, navigation }) {
  const { mealId } = route.params;
  const { ids, addFavorite, removeFavorite } = useFavorites();

  const mealIsFavorite = useMemo(() => {
    return ids.includes(mealId);
  }, [ids, mealId]);

  useEffect(() => {
    console.log("meal", mealIsFavorite)
  }, [mealIsFavorite])
  

  const handlePress = useCallback(() => {
    if (mealIsFavorite) {
      return removeFavorite(mealId);
    }
    return addFavorite(mealId);
  }, [mealIsFavorite, removeFavorite, addFavorite]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsFavorite ? "star" : "star-outline"}
            color="white"
            onPress={handlePress}
          />
        );
      },
    });
  }, [navigation, handlePress]);

  const selectedMeal = useMemo(() => {
    return MEALS.find((meal) => meal.id === mealId);
  }, [MEALS, mealId]);

  return (
    <ScrollView style={styles.routContainer}>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails item={selectedMeal} textStyle={styles.detailText} />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />

          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  routContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    maxWidth: "80%",
  },
});
