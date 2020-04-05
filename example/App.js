import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import CubeNavigation from 'react-native-cube-navigation';
import DemoView from './DemoView';

const data = [
  {
    id: '1',
    source: require('./assets/1.jpg'),
  },
  {
    id: '2',
    source: require('./assets/2.jpg'),
  },
  {
    id: '3',
    source: require('./assets/3.jpg'),
  },
  {
    id: '4',
    source: require('./assets/4.jpg'),
  },
  {
    id: '5',
    source: require('./assets/5.jpg'),
  },
];

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <StatusBar barStyle="light-content" />
        <CubeNavigation>
          <DemoView data={data[0]} />
          <DemoView data={data[1]} />
          <DemoView data={data[2]} />
          <DemoView data={data[3]} />
          <DemoView data={data[4]} />
        </CubeNavigation>
      </React.Fragment>
    );
  }
}
