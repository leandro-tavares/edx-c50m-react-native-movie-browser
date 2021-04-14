import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { styles } from "../styles";

export default class ItemText extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTextDetail}>
          <Text style={styles.itemTextSection}>{this.props.item}: </Text>
          {this.props.text}
        </Text>
      </View>
    );
  }
}
