import { CameraType, CameraView, useCameraPermissions } from "expo-camera";

import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useRef, useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";

export default function Match() {
  const cameraRef = useRef<CameraView>(null);
  const [recording, setRecording] = useState(false);

  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    console.log("Holaa");
    // Forzar orientación horizontal
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    // Restaurar orientación al salir
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
    };
  }, []);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const startRecording = async () => {
    console.log("startRecording LOG 0");
    if (cameraRef.current) {
      setRecording(true);
      console.log("startRecording LOG 1", cameraRef.current.recordAsync);
      cameraRef.current.recordAsync().then((video) => {
        console.log("startRecording LOG 2 Video saved at:", video?.uri);
        // aquí puedes subirlo o guardarlo
        setRecording(false);
      });
    }
  };

  const stopRecording = () => {
    console.log("stopRecording LOG 0");
    if (cameraRef.current) {
      console.log("stopRecording LOG 1");
      cameraRef.current.stopRecording();
    }
  };

  return (
    <View className="flex-1 w-full px-14">
      <View className="flex-row flex-1">
        <View className="bg-slate-500 w-40"></View>
        <View className="flex-1 bg-gray-50">
          <CameraView
            className="flex-1"
            style={{ flex: 1 }}
            facing={facing}
            ref={cameraRef}
            ratio="16:9"
            mode="video"
          >
            <View className="absolute top-4 right-4">
              <TouchableOpacity
                className="bg-slate-800 px-6 py-4 rounded-2xl items-center"
                onPress={toggleCameraFacing}
              >
                <Text className="text-white">Flip Camera</Text>
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
        <View className="bg-slate-800 w-40"></View>
      </View>
      <View className="bg-slate-700 h-20">
        {recording ? (
          <TouchableOpacity onPress={stopRecording}>
            <Text>⏹️ Detener</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={startRecording}>
            <Text>🔴 Grabar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
