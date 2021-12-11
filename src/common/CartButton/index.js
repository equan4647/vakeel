import React from "react";
import { View } from "react-native";
import { Colors, Metrics } from "../../theme";

const CartButton = ()=>{
    return (
      <View
        style={{
          width: Metrics.ratio(36),
          height: Metrics.ratio(36),
          borderRadius: Metrics.ratio(18),
          backgroundColor: Colors.primary,
          borderStyle: 'solid',
          borderWidth: Metrics.ratio(1),
          borderColor: Colors.white,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      ></View>
    );
}

export default CartButton;