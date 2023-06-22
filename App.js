import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, TouchableOpacity, Text, StyleSheet,Pressable } from 'react-native';

export default function App() {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (taskText.trim() !== '') {
      setTasks([...tasks, { text: taskText, completed: false }]);
      setTaskText('');
    }
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity style={styles.taskItem} onPress={() => toggleTask(index)}>
      <Text style={[styles.taskText, item.completed && styles.completedTaskText]}>{item.text}</Text>
      <Button title="Supprimer" onPress={() => deleteTask(index)} />
    </TouchableOpacity>
  );

  return (
    <>
    <View style={{display : "flex", textAlign :"center",marginTop :5 }}>
              <Text style={{ fontSize:22, fontWeight :"bold"}}>Liste des taches </Text>

    </View>
        <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={text => setTaskText(text)}
          value={taskText}
          placeholder="Nouvelle tâche"
        />
        <Pressable  style={styles.button} onPress={addTask} >
            <Text style={styles.text}>Ajouter</Text>
        </Pressable>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
    </>

  );
}

const styles = StyleSheet.create({
    button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
  },
  
});
