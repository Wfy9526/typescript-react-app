import * as React from 'react';
import {Row, Col, Input, Button, DatePicker, message} from 'antd';
import ElectricityTemp from '../temp/TempElectricity'

const RangePicker = DatePicker.RangePicker;


interface Iprops {
    rooms: object[]
}

interface Istate {
    xValue: number
}

interface IRoom {
    name: string,
    peopleNumber: number,
}

class ElectricityFees extends React.Component<Iprops, Istate> {

    public state: Istate = {
        xValue: 0,
    };
    private allMoeny: number = 0;
    private errorNumber: number = 0;
    private airSpendNumber: number = 0;
    constructor(props: any) {
        super(props);
        this.calcAccount = this.calcAccount.bind(this);
        this.errorCheck = this.errorCheck.bind(this);
        this.calcSpendExcludeAir = this.calcSpendExcludeAir.bind(this);
        this.changeMoney = this.changeMoney.bind(this);
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
        }
        this.calcSpendExcludeAir();
    };

    public errorCheck(): void{
        this.errorNumber = this.errorNumber + 1;
    }
    public changeMoney(e: any): void{
        this.allMoeny = Number(e.target.value);
    }

    public calcSpendExcludeAir(): void{
        const self = this;
        let airSpend: string = '';
        let peopleDyas: number = 0;
        this.props.rooms.forEach((_:IRoom, i:number) => {
            const child = self[`refs${i}`].current;
            const spend: number = self[`refs${i}`].current.airConditionerMoney;
            this.airSpendNumber = this.airSpendNumber + spend;
            peopleDyas = peopleDyas + child.gather.days * _.peopleNumber;

            if(i === 0){
                airSpend = `${spend}`;
            }else{
                airSpend = `${spend} + ${airSpend}`;
            }
        });
        const xValue: number = Number(((this.allMoeny - this.airSpendNumber) / peopleDyas).toFixed(2));

        this.setState({xValue}, () => {
            this.props.rooms.forEach((_:object, i:number) => {
                self[`refs${i}`].current.calcEachArrangeSpend(airSpend, self.airSpendNumber, self.state.xValue);
            });
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
                            <Input placeholder="请输入金额" defaultValue={`${this.allMoeny}`} onChange={this.changeMoney}/>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box" style={{color: 'red'}}>
                            电费平均单价; 0.4元/度， 电费每人每天 X 元。
                            <br/>
                            X 计算公式: 每个房间的均摊费用 = 人数 * 天数 * X;
                            <br/>
                            每个房间的均摊费用之和 = 总均摊费用；
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
                            解 X : {this.state.xValue }
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
                                                     allMoeny={this.allMoeny}
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