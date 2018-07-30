import * as React from 'react';
import { Tabs, Icon } from 'antd';
import './App.css';

const TabPane = Tabs.TabPane;

class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <Tabs defaultActiveKey="2">
                    <TabPane tab={<span><Icon type="meh-o" />电费</span>} key="1">
                        Tab 1
                    </TabPane>
                    <TabPane tab={<span><Icon type="tool" />水费</span>} key="2">
                        Tab 2
                    </TabPane>
                </Tabs>,
            </div>
        );
    }
}

export default App;