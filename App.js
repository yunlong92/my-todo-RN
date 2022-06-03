import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Task from "./components/Task";
import Search from "./components/Search";

export default function App() {
  const [taskItems, setTaskItems] = useState([
    "eat",
    "sleep",
    "drink",
    "pee",
    "party",
    "kiss",
  ]);
  const [searchItems] = useState([
    "eat",
    "sleep",
    "drink",
    "pee",
    "party",
    "kiss",
  ]);
  const [progressItems, setProgressItems] = useState([]);
  const [delItems, setDelItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searching, setSearching] = useState(false);

  const onSearch = (text) => {
    if (text) {
      setSearching(true);
      const temp = text.toLowerCase();

      const tempList = searchItems.filter((item) => {
        if (item.match(temp)) return item;
      });
      setFiltered(tempList);
    } else {
      setSearching(false);
      setFiltered(searchItems);
    }
  };

  const progressTask = (index) => {
    let itemsCopy = [...taskItems];
    const progress = itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    setProgressItems([...progressItems, progress]);
  };

  const completeTask = (index) => {
    let itemsCopy = [...progressItems];
    const del = itemsCopy.splice(index, 1);
    setProgressItems(itemsCopy);
    setDelItems([...delItems, del]);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.tasksWrapper}>
          <View style={styles.items}>
            <TextInput
              style={styles.input}
              placeholder="Search"
              placeholderTextColor="black"
              onChangeText={onSearch}
            />
          </View>

          <Text style={styles.sectionTitle}>Todays tasks</Text>
          <View style={styles.items}>
            {taskItems.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => progressTask(index)}
                >
                  <Task text={item} />
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.sectionTitle}>In progress tasks</Text>
          <View style={styles.items}>
            {progressItems.map((item, progress) => {
              return (
                <TouchableOpacity
                  key={progress}
                  onPress={() => completeTask(progress)}
                >
                  <Task text={item} />
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.sectionTitle}>Finished tasks</Text>
          <View style={styles.items}>
            {delItems.map((item, del) => {
              return <Task key={del} text={item} />;
            })}
          </View>
        </View>
      </ScrollView>

      {searching && (
        <Search onPress={() => setSearching(false)} searchItems={filtered} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",

    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
});
