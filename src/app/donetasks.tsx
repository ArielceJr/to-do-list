import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import "../../styles/global.css";
import AsyncStorage from '@react-native-async-storage/async-storage';

type DoneTask = {
  text: string;
  date: string;
  doneAt: string;
};

export default function DoneTasksScreen() {
  const [doneTasks, setDoneTasks] = React.useState<DoneTask[]>([]);

  React.useEffect(() => {
    const loadData = async () => {
      const doneTasksData = await AsyncStorage.getItem('doneTasks');
      if (doneTasksData) setDoneTasks(JSON.parse(doneTasksData));
    };
    loadData();
  }, []);

  React.useEffect(() => {
    AsyncStorage.setItem('doneTasks', JSON.stringify(doneTasks));
  }, [doneTasks]);

  const removeDoneTask = (index: number) => {
    const updated = doneTasks.filter((_, i) => i !== index);
    setDoneTasks(updated);
  };

  return (
    <View className="flex-1 bg-gray-100 p-4 pt-12">
      <Text className="text-3xl font-bold mb-6 text-center text-gray-800">Tarefas Concluídas</Text>
      <FlatList
        data={doneTasks}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item, index }) => (
          <View className="flex-row items-center mb-2 bg-green-400 rounded px-3 py-2">
            <View className="flex-1">
              <Text className="text-lg text-gray-800">{item.text}</Text>
              <Text className="text-gray-600 text-sm">Data Limite: {item.date}</Text>
              <Text className="text-green-900 text-xs">Concluída em: {item.doneAt}</Text>
            </View>
            <TouchableOpacity onPress={() => removeDoneTask(index)}>
              <Text className="bg-red-400 text-gray-800 font-bold px-2 py-1 rounded">Remover</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-500">Nenhuma tarefa concluída ainda.</Text>
        }
      />
    </View>
  );
}