import "../../styles/global.css";
import { Stack } from "expo-router";

export default function Layout(){
    
    return (<
        Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="donetasks" options={{ title: "Tarefas Concluídas"}} />
    </Stack>
    );

}