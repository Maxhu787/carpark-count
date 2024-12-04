import {
  TextInput,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { IconButton, Text } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

export default function Home() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View
          style={{
            paddingVertical: 20,
            width: "100%",
            alignItems: "center",
            // backgroundColor: "green",
          }}
        >
          <Text variant="displayMedium">停車費用計算</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "lightblue",
            width: "100%",
            padding: 20,
            gap: 20,
          }}
        >
          <View style={{ flex: 0.1 }}>
            <Text
              variant="headlineSmall"
              style={{ width: 20, backgroundColor: "#fff" }}
            >
              每
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <IconButton
              style={styles.button}
              icon="menu-up-outline"
              iconColor={"#fff"}
              size={25}
              onPress={() => console.log("Pressed")}
            />
            <TextInput style={styles.input} />
            <IconButton
              style={styles.button}
              icon="menu-down-outline"
              iconColor={"#fff"}
              size={25}
              onPress={() => console.log("Pressed")}
            />
          </View>
          <View style={{ flex: 0.1 }}>
            <Text
              variant="headlineSmall"
              style={{ width: 20, backgroundColor: "#fff" }}
            >
              分鐘
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <IconButton
              style={styles.button}
              icon="menu-up-outline"
              iconColor={"#fff"}
              size={25}
              onPress={() => console.log("Pressed")}
            />

            <TextInput style={styles.input} />
            <IconButton
              style={styles.button}
              icon="menu-down-outline"
              iconColor={"#fff"}
              size={25}
              onPress={() => console.log("Pressed")}
            />
          </View>
          <View style={{ flex: 0.1 }}>
            <Text
              variant="headlineSmall"
              style={{ width: 20, backgroundColor: "#fff" }}
            >
              元
            </Text>
          </View>
        </View>

        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    // alignItems: "center",
    // justifyContent: "center",
    color: "#eeefff",
    // backgroundColor: "red",
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 12,
    width: "100%",
    // margin: 0,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: "100%",
    // width: 25,
    // height: 25,
    padding: 20,
    // margin: 10,
  },
});
