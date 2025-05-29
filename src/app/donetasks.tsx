import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import "../../styles/global.css";

type DoneTask = {
  text: string;
  date: string;
  doneAt: string;
};

export default function App2() {
  const params = useLocalSearchParams();
  const doneTasks: DoneTask[] = params.doneTasks ? JSON.parse(params.doneTasks as string) : [];

  return (
    <View className="flex-1 bg-gray-100 p-4 pt-12">
      <Text className="text-3xl font-bold mb-6 text-center text-gray-800">Tarefas Concluídas</Text>
      <FlatList
        data={doneTasks}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View className="flex-row items-center mb-2 bg-green-400 rounded px-3 py-2">
            <View className="flex-1">
              <Text className="text-lg text-gray-800">{item.text}</Text>
              <Text className="text-gray-600 text-sm">Data Limite: {item.date}</Text>
              <Text className="text-green-900 text-xs">Concluída em: {item.doneAt}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-500">Nenhuma tarefa concluída ainda.</Text>
        }
      />
    </View>
  );
}