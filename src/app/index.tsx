import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ToastAndroid } from 'react-native';
import "../../styles/global.css";
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [tasks, setTasks] = useState<{ text: string; date: string }[]>([]);
  const [doneTasks, setDoneTasks] = useState<{ text: string; date: string; doneAt: string }[]>([]);

  React.useEffect(() => {
    const loadData = async () => {
      const tasksData = await AsyncStorage.getItem('tasks');
      const doneTasksData = await AsyncStorage.getItem('doneTasks');
      if (tasksData) setTasks(JSON.parse(tasksData));
      if (doneTasksData) setDoneTasks(JSON.parse(doneTasksData));
    };
    loadData();
    }, []);

  React.useEffect(() => {
    AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

 const addTask = () => {
  if (task=='' || date=='') {
      ToastAndroid.show('Por favor, preencha todos os campos!', ToastAndroid.SHORT);
      return;
    }
    setTasks([...tasks, { text: task, date: date }]);
    setTask('');
    setDate('');
    ToastAndroid.show('Tarefa adicionada com sucesso!', ToastAndroid.SHORT);
};

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
    ToastAndroid.show('Tarefa removida com sucesso!', ToastAndroid.SHORT);
  };

  const markTaskAsDone = async (index: number) => {
  const completedTask = tasks[index];
  const today = new Date();
  const doneAt = today.toLocaleDateString();
  const newDoneTask = { ...completedTask, doneAt };
  const doneTasksData = await AsyncStorage.getItem('doneTasks');
  const currentDoneTasks = doneTasksData ? JSON.parse(doneTasksData) : [];
  const updatedDoneTasks = [...currentDoneTasks, newDoneTask];
  setDoneTasks(updatedDoneTasks);
  setTasks(tasks.filter((_, i) => i !== index));
  await AsyncStorage.setItem('doneTasks', JSON.stringify(updatedDoneTasks));
  ToastAndroid.show('Tarefa marcada como concluída!', ToastAndroid.SHORT);
};

  return (
    <View className="flex-1 bg-gray-100 p-4 pt-12">
      <Text className="text-3xl font-bold mb-6 text-center text-gray-800">To Do List</Text>
      <View className="flex-row mb-4">
        <TextInput
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 mr-2 bg-white"
          placeholder="Nova tarefa"
          value={task}
          onChangeText={setTask}
        />
        <TextInput
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 mr-2 bg-white"
          placeholder="Data de entrega"
          value={date}
          onChangeText={setDate}
        />
        <TouchableOpacity className="bg-gray-800 px-4 py-2 rounded-lg justify-center" onPress={addTask}>
          <Text className="text-white font-bold">Adicionar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item, index }) => (
          <View className="flex-row items-center mb-2 bg-gray-800 rounded px-3 py-2">
            <View className="flex-1">
              <Text className="text-lg text-white">{item.text}</Text>
              <Text className="text-gray-300 text-sm">Entrega: {item.date}</Text>
            </View>
            <TouchableOpacity onPress={() => markTaskAsDone(index)}>
              <Text className="bg-green-400 text-gray-800 font-bold px-2 py-1 rounded mx-1">Concluir</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeTask(index)}>
              <Text className="bg-red-400 text-gray-800 font-bold px-2 py-1 rounded">Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />
     <View className="flex-row items-center justify-center mb-6">
     <Link
  href="/donetasks"
  asChild
>
  <TouchableOpacity className="bg-green-700 px-4 py-3 rounded-lg mb-4 ">
    <Text className="text-white text-center font-bold">Ver tarefas concluídas</Text>
  </TouchableOpacity>
</Link>
    </View>
    </View>
  );
}
