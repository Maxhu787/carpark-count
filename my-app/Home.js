import {
  TextInput,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Modal, Portal, IconButton, Text, DataTable } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [rate, setRate] = useState("30");
  const [rateHr, setRateHr] = useState("1");

  const [ruleHr, setRuleHr] = useState("1");
  const [type, setType] = useState(null);
  const [calc, setCalc] = useState(null);
  const [calcPrice, setCalcPrice] = useState("");
  const [rules, setRules] = useState([]);

  const addRule = () => {
    const newRule = { ruleHr, type, calc, calcPrice };
    setRules([...rules, newRule]);
    setVisible(false);

    setRuleHr("1");
    setType(null);
    setCalc(null);
    setCalcPrice("");
  };

  const data1 = [
    { label: "以內", value: "1" },
    { label: "之後", value: "2" },
  ];
  const data2 = [
    { label: "免費", value: "3" },
    { label: "自訂", value: "4" },
  ];
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={() => setVisible(false)}
            contentContainerStyle={{
              backgroundColor: "white",
              paddingVertical: 20,
              paddingHorizontal: 18,
            }}
          >
            <Text variant="headlineSmall" style={{ marginBottom: 14 }}>
              新增規則
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TextInput
                value={ruleHr}
                keyboardType="numeric"
                style={{
                  width: "25%",
                  height: 50,
                  padding: 10,
                  fontSize: 20,
                  borderStyle: "solid",
                  borderWidth: 2,
                  borderColor: "black",
                  borderRadius: 12,
                }}
                onChangeText={(text) => setRuleHr(text)}
              />
              <Text variant="titleLarge">小時</Text>
              <Dropdown
                style={{
                  width: "25%",
                  height: 50,
                  padding: 10,
                  borderStyle: "solid",
                  borderWidth: 2,
                  borderColor: "black",
                  borderRadius: 12,
                }}
                placeholderStyle={{ fontSize: 20 }}
                selectedTextStyle={{ fontSize: 20 }}
                data={data1}
                labelField="label"
                valueField="value"
                placeholder="選取"
                value={type}
                onChange={(item) => {
                  setType(item.value);
                }}
              />
              <Dropdown
                style={{
                  width: "25%",
                  height: 50,
                  padding: 10,
                  borderStyle: "solid",
                  borderWidth: 2,
                  borderColor: "black",
                  borderRadius: 12,
                }}
                placeholderStyle={{ fontSize: 20 }}
                selectedTextStyle={{ fontSize: 20 }}
                data={data2}
                labelField="label"
                valueField="value"
                placeholder="選取"
                value={calc}
                onChange={(item) => {
                  setCalc(item.value);
                }}
              />
            </View>
            {calc === "4" && (
              <TextInput
                value={calcPrice}
                keyboardType="numeric"
                style={{
                  width: "25%",
                  height: 50,
                  padding: 10,
                  fontSize: 20,
                  marginTop: 12,
                  borderStyle: "solid",
                  borderWidth: 2,
                  borderColor: "black",
                  borderRadius: 12,
                }}
                onChangeText={(text) => setCalcPrice(text)}
              />
            )}
            <IconButton
              style={[styles.button, { marginTop: 18 }]}
              icon="check"
              iconColor={"#fff"}
              size={25}
              onPress={addRule}
            />
          </Modal>
        </Portal>
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
        <Text
          variant="headlineSmall"
          style={{ paddingHorizontal: 20, paddingVertical: 8 }}
        >
          基本費用
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            widthƒ: "100%",
            paddingHorizontal: 20,
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
              onPress={() => setRate(parseFloat(rate) + 1)}
            />
            <TextInput
              value={rate.toString()}
              keyboardType="numeric"
              style={styles.input}
              onChangeText={(text) => setRate(text)}
            />
            <IconButton
              style={styles.button}
              icon="menu-down-outline"
              iconColor={"#fff"}
              size={25}
              onPress={() => {
                if (rate > 1) setRate(parseFloat(rate) - 1);
              }}
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
              onPress={() => setRateHr(parseFloat(rateHr) + 1)}
            />
            <TextInput
              value={rateHr.toString()}
              keyboardType="numeric"
              style={styles.input}
              onChangeText={(text) => setRateHr(text)}
            />
            <IconButton
              style={styles.button}
              icon="menu-down-outline"
              iconColor={"#fff"}
              size={25}
              onPress={() => {
                if (rateHr > 1) setRateHr(parseFloat(rateHr) - 1);
              }}
            />
          </View>
          <Text
            variant="displaySmall"
            style={{
              width: 50,
              textAlign: "center",
            }}
          >
            hr
          </Text>
        </View>
        <View
          style={{
            paddingVertical: 20,
            width: "100%",
            // alignItems: "center",
            paddingHorizontal: 20,
            // backgroundColor: "green",
          }}
        >
          <Text variant="headlineSmall" style={{ marginBottom: 10 }}>
            計算規則
          </Text>
          <IconButton
            style={styles.button}
            icon="plus-circle-outline"
            iconColor={"#fff"}
            size={25}
            onPress={() => setVisible(true)}
          />
          <IconButton
            style={styles.button}
            icon="alert-circle-outline"
            iconColor={"#fff"}
            size={25}
            onPress={() =>
              alert(
                `Rate: ${rate}, RateHr: ${rateHr}, RuleHr: ${ruleHr}, Type: ${type}, Calc: ${calc}, Rules: ${JSON.stringify(
                  rules
                )}`
              )
            }
          />
        </View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>小時</DataTable.Title>
            <DataTable.Title>類型</DataTable.Title>
            <DataTable.Title>計算</DataTable.Title>
            <DataTable.Title>價格</DataTable.Title>
          </DataTable.Header>
          {rules.map((rule, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{rule.ruleHr}</DataTable.Cell>
              <DataTable.Cell>
                {rule.type === "1" ? "以內" : rule.type === "2" ? "之後" : ""}
              </DataTable.Cell>
              <DataTable.Cell>
                {rule.calc === "3" ? "免費" : rule.calc === "4" ? "自訂" : ""}
              </DataTable.Cell>
              <DataTable.Cell>{rule.calcPrice}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
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
    padding: 12,
    fontSize: 24,
    // marginVertical: 10,
  },
});
