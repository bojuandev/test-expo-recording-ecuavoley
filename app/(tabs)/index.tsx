import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const router = useRouter();

  return (
    <View className="flex-1">
      <View>
        <Text>Home</Text>
      </View>
      <View>
        <TouchableOpacity
          className="bg-slate-800 px-6 py-4 rounded-2xl items-center"
          onPress={() => router.push("/match")}
        >
          <Text className="text-white">Ir al partido</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
