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
            // backgroundColor: "lightblue",
            widthƒ: "100%",
            padding: 20,
            gap: 12,
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            <IconButton
              style={styles.button}
              icon="menu-up-outline"
              iconColor={"#fff"}
              size={25}
              onPress={() => console.log("Pressed")}
            />
            <TextInput
              value={"20 $"}
              keyboardType="numeric"
              style={styles.input}
            />
            <IconButton
              style={styles.button}
              icon="menu-down-outline"
              iconColor={"#fff"}
              size={25}
              onPress={() => console.log("Pressed")}
            />
          </View>
          <Text
            variant="displayMedium"
            style={{
              width: 50,
              textAlign: "center",
            }}
          >
            /
          </Text>
          <View style={{ flex: 1, alignItems: "center" }}>
            <IconButton
              style={styles.button}
              icon="menu-up-outline"
              iconColor={"#fff"}
              size={25}
              onPress={() => console.log("Pressed")}
            />
            <TextInput
              value={"30"}
              keyboardType="numeric"
              style={styles.input}
            />
            <IconButton
              style={styles.button}
              icon="menu-down-outline"
              iconColor={"#fff"}
              size={25}
              onPress={() => console.log("Pressed")}
            />
          </View>
          <Text
            variant="displaySmall"
            style={{
              width: 50,
              textAlign: "center",
            }}
          >
            分鐘
          </Text>
        </View>
        <StatusBar backgroundColor={"#258AEA"} style="auto" />
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
    backgroundColor: "rgb(45, 45, 45)",
    borderRadius: 12,
    width: "100%",
    // margin: 0,
  },
  input: {
    backgroundColor: "#eee",
    borderRadius: 12,
    width: "100%",
    padding: 20,
    fontSize: 30,
    marginVertical: 10,
  },
});
