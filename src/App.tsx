import * as React from 'react';
import { Tabs, Icon } from 'antd';
import {connect} from 'react-redux';
import getDataByAjax from "./utils/util";

import './style/App.css';
import ElectricityFees from './electricityFees/ElectricityFees'

const TabPane = Tabs.TabPane;

interface Istate {
    rooms: object[]
}

class App extends React.Component<any, Istate> {
    public state: Istate = {
      rooms: []
    };

    public componentWillMount(){
        this.getFileData();
    }

    public getFileData: () => void = () =>{
        getDataByAjax("./data.json").then((data: object) => {
            const key: string = "room";
            this.setState({rooms: data[key]})
        });
    };


    public render() {
        return (
                <div className="App">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab={<span><Icon type="meh-o" />电费</span>} key="1">
                            <ElectricityFees rooms={this.state.rooms}/>
                        </TabPane>
                        <TabPane tab={<span><Icon type="tool" />水费</span>} key="2">
                            Tab 2
                        </TabPane>
                    </Tabs>
                </div>


        );
    }
}

export default connect()(App);