import {
  TextInput,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { Modal, Portal, IconButton, Text, DataTable } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
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
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const [hoursLater, setHoursLater] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      let remainingHours = parseFloat(hoursLater);
      rules.sort((a, b) => parseFloat(b.ruleHr) - parseFloat(a.ruleHr));

      rules.forEach((rule) => {
        if (remainingHours <= 0) return;
        const ruleHours = parseFloat(rule.ruleHr);
        if (rule.type === "1" && remainingHours <= ruleHours) {
          total += rule.calc === "3" ? 0 : parseFloat(rule.calcPrice);
          remainingHours = 0;
        } else if (rule.type === "1" && remainingHours > ruleHours) {
          total += rule.calc === "3" ? 0 : parseFloat(rule.calcPrice);
          remainingHours -= ruleHours;
        } else if (rule.type === "2" && remainingHours > ruleHours) {
          total += rule.calc === "3" ? 0 : parseFloat(rule.calcPrice);
          remainingHours -= ruleHours;
        }
      });

      if (remainingHours > 0) {
        total += (remainingHours / rateHr) * rate;
      }
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [rules, rate, rateHr, hoursLater]);

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
      <ScrollView style={styles.container}>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={() => setVisible(false)}
            contentContainerStyle={{
              backgroundColor: "rgb(34, 34, 34)",
              paddingVertical: 20,
              paddingHorizontal: 18,
            }}
          >
            <Text
              variant="headlineSmall"
              style={{ marginBottom: 14, color: "#fff" }}
            >
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
                  borderColor: "#fff",
                  borderRadius: 12,
                  color: "#fff",
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
                  borderColor: "#fff",
                  borderRadius: 12,
                }}
                placeholderStyle={{ fontSize: 20, color: "#fff" }}
                selectedTextStyle={{ fontSize: 20, color: "#fff" }}
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
                  borderColor: "#fff",
                  borderRadius: 12,
                }}
                placeholderStyle={{ fontSize: 20, color: "#fff" }}
                selectedTextStyle={{ fontSize: 20, color: "#fff" }}
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
                  borderColor: "#fff",
                  borderRadius: 12,
                  color: "#fff",
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
          }}
        >
          <Text variant="displayMedium" style={{ color: "#258AEA" }}>
            停車費用計算
          </Text>
        </View>
        <Text
          variant="headlineMedium"
          style={{
            paddingHorizontal: 20,
            textAlign: "left",
            width: "100%",
            color: "#fff",
          }}
        >
          總費用 {totalPrice}$
        </Text>
        <Text
          variant="headlineSmall"
          style={{ paddingHorizontal: 20, paddingVertical: 8, color: "#fff" }}
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
              color: "#fff",
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
              textAlign: "left",
              color: "#fff",
            }}
          >
            {" "}
            hr
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
            // alignItems: "center",
          }}
        >
          <Text
            variant="headlineSmall"
            style={{
              marginBottom: 10,
              marginTop: 18,
              textAlign: "left",
              width: "100%",
              color: "#fff",
            }}
          >
            停車時間
          </Text>
          <Text
            variant="titleMedium"
            style={{ textAlign: "left", marginVertical: 0, color: "#fff" }}
          >
            離開時間 (小時後)
          </Text>
          <TextInput
            value={hoursLater}
            keyboardType="numeric"
            style={{
              width: "100%",
              height: 50,
              padding: 10,
              fontSize: 20,
              marginTop: 10,
              borderStyle: "solid",
              borderWidth: 3,
              borderColor: "#fff",
              borderRadius: 12,
              color: "#fff",
            }}
            onChangeText={(text) => setHoursLater(text)}
          />
          <Text
            variant="titleMedium"
            style={{ textAlign: "center", marginVertical: 10, color: "#fff" }}
          >
            Current Time: {currentTime}
          </Text>
        </View>
        <View
          style={{
            paddingVertical: 20,
            width: "100%",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <Text
            variant="headlineSmall"
            style={{
              marginBottom: 10,
              textAlign: "left",
              width: "100%",
              color: "#fff",
            }}
          >
            計算規則
          </Text>
          <IconButton
            style={[styles.button, { alignSelf: "center" }]}
            icon="plus-circle-outline"
            iconColor={"#fff"}
            size={25}
            onPress={() => setVisible(true)}
          />
        </View>
        <DataTable
          style={{ paddingBottom: 50, backgroundColor: "rgb(34, 34, 34)" }}
        >
          <DataTable.Header>
            <DataTable.Title textStyle={{ color: "#fff" }}>
              小時
            </DataTable.Title>
            <DataTable.Title textStyle={{ color: "#fff" }}>
              類型
            </DataTable.Title>
            <DataTable.Title textStyle={{ color: "#fff" }}>
              計算
            </DataTable.Title>
            <DataTable.Title textStyle={{ color: "#fff" }}>
              價格
            </DataTable.Title>
          </DataTable.Header>
          {rules.map((rule, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell textStyle={{ color: "#fff" }}>
                {rule.ruleHr}
              </DataTable.Cell>
              <DataTable.Cell textStyle={{ color: "#fff" }}>
                {rule.type === "1" ? "以內" : rule.type === "2" ? "之後" : ""}
              </DataTable.Cell>
              <DataTable.Cell textStyle={{ color: "#fff" }}>
                {rule.calc === "3" ? "免費" : rule.calc === "4" ? "自訂" : ""}
              </DataTable.Cell>
              <DataTable.Cell textStyle={{ color: "#fff" }}>
                {rule.calcPrice}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
        <StatusBar backgroundColor={"#258AEA"} style="auto" />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    // alignItems: "center",
    // justifyContent: "center",
    color: "#000",
    backgroundColor: "rgb(34, 34, 34)",
  },
  button: {
    // backgroundColor: "rgb(45, 45, 45)",
    backgroundColor: "#258AEA",
    borderRadius: 12,
    width: "100%",
    // margin: 0,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: "100%",
    padding: 12,
    fontSize: 24,
    // marginVertical: 10,
  },
});
