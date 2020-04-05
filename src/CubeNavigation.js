import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Animated, Dimensions, Platform, View } from "react-native";
const { width } = Dimensions.get("window");
import styles from "./styles";

const perspective = width;
const angle = Math.atan(perspective / (width / 2));
const ratio = Platform.OS === "ios" ? 2 : 1.2;

export default class CubeNavigation extends Component {
  static propTypes = {
    backdropOpacity: PropTypes.number,
    backgroundColor: PropTypes.string,
  };

  static defaultProps = {
    backdropOpacity: 0.8,
    backgroundColor: "black",
  };
  state = {
    x: new Animated.Value(0),
  };

  getTransformStyle(index) {
    const { x } = this.state;
    const offset = index * width;
    const inputRange = [offset - width, offset + width];
    const translateX = x.interpolate({
      inputRange,
      outputRange: [width / ratio, -width / ratio],
      extrapolate: "clamp",
    });
    const rotateY = x.interpolate({
      inputRange,
      outputRange: [`${angle}rad`, `-${angle}rad`],
      extrapolate: "clamp",
    });
    const translateX1 = x.interpolate({
      inputRange,
      outputRange: [width / 2, -width / 2],
      extrapolate: "clamp",
    });
    const extra = width / ratio / Math.cos(angle / 2) - width / ratio;
    const translateX2 = x.interpolate({
      inputRange,
      outputRange: [-extra, extra],
      extrapolate: "clamp",
    });
    return {
      ...StyleSheet.absoluteFillObject,
      transform: [
        { perspective },
        { translateX },
        { rotateY },
        { translateX: translateX1 },
        { translateX: translateX2 },
      ],
    };
  }

  getBlackdropStyle(index) {
    const { backdropOpacity } = this.props;
    const { x } = this.state;
    const offset = index * width;
    const inputRange = [offset - width, offset, offset + width];
    const opacity = x.interpolate({
      inputRange,
      outputRange: [backdropOpacity, 0, backdropOpacity],
      extrapolate: "clamp",
    });
    return {
      backgroundColor: "black",
      ...StyleSheet.absoluteFillObject,
      opacity,
    };
  }

  renderChildren = (child, i) => {
    return (
      <Animated.View style={this.getTransformStyle(i)} key={child.id || i}>
        {child}
        <Animated.View style={this.getBlackdropStyle(i)} />
      </Animated.View>
    );
  };

  render() {
    const { children, backgroundColor } = this.props;
    const { x } = this.state;
    return (
      <View style={[styles.container, { backgroundColor }]}>
        {this.props.children.map(this.renderChildren)}
        <Animated.ScrollView
          style={StyleSheet.absoluteFillObject}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToInterval={width}
          contentContainerStyle={{ width: width * children.length }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { x },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          decelerationRate={0.99}
          horizontal
        />
      </View>
    );
  }
}
