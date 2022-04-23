# react navigation 使用
react-navigation 是 react-native 创建导航的形式，可以在 android 和 ios 上同时使用

## 导航形式
react-navigation 分为三种形式
```md
StackNavigator // 标准的导航条，一般在头部显示
TabNavigator  // tab页的导航条，可以在头部或者尾部显示
DrawerNavigator // 抽屉导航条，一般是左侧打开
```

## Usage
```jsx
import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';

const HomeScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Home Screen</Text>
  </View>
);

const DetailsScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Details Screen</Text>
  </View>
);

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Details: {
    screen: DetailsScreen,
  },
});

export default RootNavigator;
```
