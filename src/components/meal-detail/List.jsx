import React from "react";
import { StyleSheet, Text, View } from "react-native";

function List({ data }) {
  return (
    <View key={data} style={styles.listItem}>
      {data.map((item, i) => (
        <Text key={i} style={styles.itemText}>{item}</Text>
      ))}
    </View>
  );
}

export default List;

const styles = StyleSheet.create({
  listItem: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 12,
  },
  itemText: {
    marginVertical: 4,
    borderRadius: 6,
    backgroundColor: "#e2b497",
    color: "#351401",
    textAlign: "center",
  },
});
