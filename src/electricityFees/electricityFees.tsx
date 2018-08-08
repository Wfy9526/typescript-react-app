import * as React from 'react';
import {Row, Col, Input, Button, DatePicker, message} from 'antd';
import ElectricityTemp from '../temp/TempElectricity'

const RangePicker = DatePicker.RangePicker;


interface Iprops {
    rooms: object[]
}

interface Istate {
    allMoeny: number
}

class ElectricityFees extends React.Component<Iprops, Istate> {

    public state: Istate = {
        allMoeny: 256,
    };
    private errorNumber: number = 0;
    constructor(props: any) {
        super(props);
        this.calcAccount = this.calcAccount.bind(this);
        this.errorCheck = this.errorCheck.bind(this);
        this.calcSpendExcludeAir = this.calcSpendExcludeAir.bind(this);
    }

    public calcAccount: (e: any) => void = (e: any) => {
        e.preventDefault();
        const self = this;
        this.errorNumber = 0;
        this.props.rooms.forEach((_:object, i:number) => {
            self[`refs${i}`].current.check();
        });

        if(this.errorNumber > 0){
            message.error('请补全信息');
            return;
        }
        this.calcSpendExcludeAir();
    };

    public errorCheck(): void{
        this.errorNumber = this.errorNumber + 1;
    }

    public calcSpendExcludeAir(): void{
        const self = this;

        let airSpend: string = '';
        let airSpendNumber: number = 0;
        this.props.rooms.forEach((_:object, i:number) => {
            const spend: number = self[`refs${i}`].current.airConditionerMoney;
            airSpendNumber = airSpendNumber + spend;
            if(i === 0){
                airSpend = `${spend}`;
            }else{
                airSpend = `${spend} + ${airSpend}`;
            }
        });

        this.props.rooms.forEach((_:object, i:number) => {
            self[`refs${i}`].current.calcEachArrangeSpend(airSpend, airSpendNumber);
        });
    }


    public render() {
        const key: string = 'name';
        const key2: string = 'peopleNumber';
        let allPeople: number = 0;
        this.props.rooms.forEach((_:object, i:number) => {
            this[`refs${i}`] = React.createRef();
            allPeople = allPeople + _[key2];
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
                                    <ElectricityTemp ref={this[`refs${i}`]}
                                                     name={_[key]}
                                                     allPeople={allPeople}
                                                     allMoeny={this.state.allMoeny}
                                                     errorCheck={this.errorCheck}
                                                     peopleNumber={_[key2]}/>
                                </Col>
                            )
                        })
                    }
                </Row>
                <Row gutter={24} style={{marginTop: '8px'}}>
                    <Col className="gutter-row" span={24}>
                        <Button onClick={this.calcAccount}>结算</Button>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default ElectricityFees;