import * as React from 'react';
import {Row, Col, Input, Button, DatePicker} from 'antd';
import ElectricityTemp from '../temp/TempElectricity'

const RangePicker = DatePicker.RangePicker;


interface Iprops {
    name?: string
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
    }

    public render() {
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

                <Row  gutter={24} style={{marginTop: '20px', borderTop: '1px solid gray'}}>
                    {
                        <Col className="gutter-row" span={6}>
                            <ElectricityTemp name={'12'} />
                        </Col>
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
            </React.Fragment>
        )
    }
}

export default ElectricityFees;