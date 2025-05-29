import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ToastAndroid } from 'react-native';
import "../../styles/global.css";
import { Link } from 'expo-router';

export default function App() {
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [tasks, setTasks] = useState<{ text: string; date: string }[]>([]);
  const [doneTasks, setDoneTasks] = useState<{ text: string; date: string; doneAt: string }[]>([]);

 const addTask = () => {
  if (task=='' || date=='') {
      ToastAndroid.show('Por favor, preencha tasks os campos!', ToastAndroid.SHORT);
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

  const markTaskAsDone = (index: number) => {
    const completedTask = tasks[index];
    const today = new Date();
    const doneAt = today.toLocaleDateString();
    setDoneTasks([...doneTasks, { ...completedTask, doneAt }]);
    removeTask(index);
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
  href={{
    pathname: '/donetasks',
    params: { doneTasks: JSON.stringify(doneTasks) }
  }}
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f3f4f6',
//     padding: 16,
//     marginTop: 50, 
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     textAlign: 'center',
//     color: '#1f2937',
//   },
//   inputRow: {
//     flexDirection: 'row',
//     marginBottom: 16,
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#d1d5db',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     marginRight: 8,
//     backgroundColor: '#fff',
//   },
//   addButton: {
//     backgroundColor: '#1f2937',
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderRadius: 8,
//     justifyContent: 'center',
//   },
//   addButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   taskItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//     backgroundColor: '#1f2937',
//     borderRadius: 4,
//     paddingHorizontal: 12,
//     paddingVertical: 8,

//   },
//   taskText: {
//     flex: 1,
//     fontSize: 18,
//     color: '#fff',
//   },
//   removeText: {
//     color: '#1f2937',
//     fontWeight: 'bold',
//     backgroundColor: '#f87171',
//     padding: 4,
//     borderRadius: 4,
//   },
//   doneText: {
//     color: '#1f2937',
//     fontWeight: 'bold',
//     backgroundColor: '#34d399',
//     padding: 4,
//     borderRadius: 4,
//     marginLeft: 8,
//     marginRight: 8,
//   },
//   entrega: {
//     color: '#9ca3af',
//     fontSize: 14,
//   },
// });