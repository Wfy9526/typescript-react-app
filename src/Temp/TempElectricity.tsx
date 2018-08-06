import * as React from 'react';
import {Row, Col, DatePicker, Input} from 'antd';
import '../style/temp.css';

const RangePicker = DatePicker.RangePicker;

interface Iprops {
    name: string,
}

interface Igather {
    last: number,
    current: number,
    days: number,
    airConditionerMoney: number
}

class ElectricityTemp extends React.Component<Iprops, any> {
    private gather: Igather = {
        airConditionerMoney: 0,
        current: 0,
        days: 0,
        last: 0,
    }
    constructor(props: any) {
        super(props);
    }

    public getVal (name: string, e:any): void{
        this.gather[name] = Number(e.target.value);
    }

    public test() {
        alert(this.props.name);
    }



    public render() {
        return (
            <Row gutter={24} style={{marginBottom: '20px'}} className="temp">
                <Col className="gutter-row" span={8}>
                    <div className="gutter-box">房间名:</div>
                </Col>
                <Col className="gutter-row" span={16}>
                    <div className="gutter-box">
                        <Input placeholder="房间名" disabled={true} defaultValue={this.props.name}/>
                    </div>
                </Col>
                <Col className="gutter-row" span={8}>
                    <div className="gutter-box">上次电表量:</div>
                </Col>
                <Col className="gutter-row" span={16}>
                    <div className="gutter-box">
                        <Input placeholder="度数"  onChange={this.getVal.bind(this, 'last')}/>
                    </div>
                </Col>
                <Col className="gutter-row" span={8}>
                    <div className="gutter-box">本次电表量:</div>
                </Col>
                <Col className="gutter-row" span={16}>
                    <div className="gutter-box">
                        <Input placeholder="度数" onChange={this.getVal.bind(this, 'current')}/>
                    </div>
                </Col>
                <Col className="gutter-row" span={8}>
                    <div className="gutter-box">时间:</div>
                </Col>
                <Col className="gutter-row" span={16}>
                    <div className="gutter-box">
                        <RangePicker/>
                    </div>
                </Col>
                <Col className="gutter-row" span={8}>
                    <div className="gutter-box">空调费:</div>
                </Col>
                <Col className="gutter-row" span={16}>
                    <div className="gutter-box">
                        ...
                    </div>
                </Col>
            </Row>
        );
    }
}

export default ElectricityTemp;