import * as React from 'react';
import { Tabs, Icon } from 'antd';
import {connect} from 'react-redux';
import getDataByAjax from "./utils/util";
import * as eventEnum from './store/eventEnum';

import './style/App.css';
import ElectricityFees from './electricityFees/ElectricityFees'

const TabPane = Tabs.TabPane;

interface Istate {
    rooms: object[]
}

interface Iprops {
    addRoom: any,
    rooms: object[]
}

class App extends React.Component<Iprops, Istate> {
    public state: Istate = {
      rooms: []
    };

    constructor(props: any){
        super(props);
        this.getFileData = this.getFileData.bind(this);
    }
    public componentWillMount(){
        this.getFileData();
    }

    public getFileData: () => void = () =>{
        getDataByAjax("./data.json").then((data: object) => {
            const key: string = "room";
            this.props.addRoom(data[key]);
        });
    };

    public render() {
        return (
                <div className="App" style={{padding: '10px 20px'}}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab={<span><Icon type="meh-o" />电费</span>} key="1">
                            <ElectricityFees/>
                        </TabPane>
                        <TabPane tab={<span><Icon type="tool" />水费</span>} key="2">
                            Tab 2
                        </TabPane>
                    </Tabs>
                </div>
        );
    }
}

const stateToProps = (store: Istate) => {
    return {rooms: store.rooms}
};

const dispatchToProps = (dispatch: any) => {
    return {
        addRoom: (data: object[]) => {
            dispatch({type: eventEnum.ADDROOM, val: data})
        }
    }
};

export default connect(stateToProps, dispatchToProps)(App);