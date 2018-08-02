import * as React from 'react';
import { Tabs, Icon } from 'antd';
import {connect} from 'react-redux';

import './App.css';
import ElectricityFees from './electricityFees/ElectricityFees'

const TabPane = Tabs.TabPane;

class App extends React.Component {
    public render() {
        return (
                <div className="App">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab={<span><Icon type="meh-o" />电费</span>} key="1">
                            <ElectricityFees />
                        </TabPane>
                        <TabPane tab={<span><Icon type="tool" />水费</span>} key="2">
                            Tab 2
                        </TabPane>
                    </Tabs>,
                </div>


        );
    }
}

export default connect()(App);