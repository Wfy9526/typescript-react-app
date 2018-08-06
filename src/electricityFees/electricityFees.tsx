import * as React from 'react';
import {Row, Col, Input, Button, DatePicker} from 'antd';
import ElectricityTemp from '../temp/TempElectricity'

const RangePicker = DatePicker.RangePicker;


interface Iprops {
    rooms: object[]
}

interface Istate {
    allMoeny: number,
}

class ElectricityFees extends React.Component<Iprops, Istate> {

    public state: Istate = {
        allMoeny: 256,
    };

    constructor(props: any) {
        super(props);
        this.calcAccount = this.calcAccount.bind(this);
    }

    public calcAccount: (e: any) => void = (e: any) => {
        e.preventDefault();
        const self = this;
        this.props.rooms.forEach((_:object, i:number) => {
            self[`refs${i}`].current.test();
        });
    };


    public render() {
        const key: string = 'name';
        this.props.rooms.forEach((_:object, i:number) => {
            this[`refs${i}`] = React.createRef();
        });

        return (

            <React.Fragment>
                <Row gutter={24} style={{marginBottom: '20px'}}>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box">电费:</div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box">
                            <RangePicker />
                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box">
                            <Input placeholder="请输入金额"/>
                        </div>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col className="gutter-row" span={6}>
                        <Button>添加一户:</Button>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box">
                            <Input placeholder="请输入门牌号"/>
                        </div>
                    </Col>

                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box" style={{color: 'red'}}>
                            电费平均单价; 0.4元/度
                        </div>
                    </Col>
                </Row>
                <Row gutter={24} style={{marginTop: '20px', borderTop: '1px solid gray'}} type="flex" justify="space-around">
                    {
                        this.props.rooms.map((_: object, i: number) => {
                            return (
                                <Col className="gutter-row" span={Math.ceil(24 / this.props.rooms.length)} key={i}>
                                    <ElectricityTemp name={_[key]} ref={this[`refs${i}`]}/>
                                </Col>
                            )
                        })
                    }
                </Row>
                <Row gutter={24} style={{margin: '15px 0px'}}>
                    <Col className="gutter-row" span={6}>
                       每户平摊费用:
                    </Col>
                    <Col className="gutter-row" span={18}>
                        <div className="gutter-box">
                            3
                        </div>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col className="gutter-row" span={6}>
                        应交:
                    </Col>
                    <Col className="gutter-row" span={18}>
                        <div className="gutter-box">
                            ..
                        </div>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col className="gutter-row" span={24}>
                        <Button onClick={this.calcAccount}>结算</Button>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default ElectricityFees;