import * as React from 'react';
import {Row, Col, DatePicker, Input, message} from 'antd';
import '../style/temp.css';

const RangePicker = DatePicker.RangePicker;

interface Iprops {
    name: string,
    peopleNumber: number,
    allMoeny: number,
    allPeople: number,
    errorCheck: () => void,
}

interface Igather {
    last: number,
    current: number,
    days: number,
    name: string
}

interface Istate {
    airSpendDisplay: string,
    arrageSpend: string
}

class ElectricityTemp extends React.Component<Iprops, any> {
    public gather: Igather = {
        current: 0,
        days: 0,
        last: 0,
        name: this.props.name
    };

    public airConditionerMoney: number = 0;
    public arrangeSpendNumber: number = 0;

    public state: Istate = {
        airSpendDisplay: '',
        arrageSpend: '',
    };

    constructor(props: any) {
        super(props);
        this.dateChange = this.dateChange.bind(this);
    }

    public getVal (name: string, e:any): void{
        this.gather[name] = Number(e.target.value);
    }

    public check() {
        const valueArr: number[] = (Object as any).values(this.gather);
        if(valueArr.includes(0)){
            this.props.errorCheck();
        }else{
            if(this.gather.current -this.gather.last < 0 ){
                message.error('电表数量输入错误');
                return;
            }
            this.airConditionerMoney = (this.gather.current - this.gather.last) * 0.4;
            const airSpendDisplay: string = `(${this.gather.current} - ${this.gather.last}) * 0.4 = ${this.airConditionerMoney}元`;
            this.setState({airSpendDisplay});
        }

    }

    public calcEachArrangeSpend(airSpend: string, airSpendNumber: number, xValue: number): void {
        const arrangeSpend: string = `${xValue} * ${this.props.peopleNumber} * ${this.gather.days} `;
        this.arrangeSpendNumber = xValue  * this.props.peopleNumber * this.gather.days;
        this.setState({arrageSpend: `${arrangeSpend} = ${this.arrangeSpendNumber}`})
    }

    public dateChange(a: any[], timeArr: string[]){
        const times: number = new Date(timeArr[1]).getTime() - new Date(timeArr[0]).getTime();
        this.gather.days = Math.ceil(times / (24 * 60 * 60 * 1000));
    }


    public render() {
        return (
            <React.Fragment>
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
                        <div className="gutter-box">居住人数:</div>
                    </Col>
                    <Col className="gutter-row" span={16}>
                        <div className="gutter-box">
                            <Input placeholder="居住人数"  defaultValue={`${this.props.peopleNumber}`}/>
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
                            <RangePicker onChange={this.dateChange}/>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div className="gutter-box">空调费:</div>
                    </Col>
                    <Col className="gutter-row" span={16}>
                        <div className="gutter-box">
                            {this.state.airSpendDisplay}
                        </div>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col className="gutter-row" span={8}>
                        <div className="gutter-box">平摊费用:</div>
                    </Col>
                    <Col className="gutter-row" span={16}>
                        <div className="gutter-box">
                            {this.state.arrageSpend}
                        </div>
                    </Col>
                </Row>
                <Row gutter={24} style={{marginTop: '15px', color: 'red', fontSize: '16px', textAlign: 'center'}}>
                    <Col className="gutter-row" span={6}>
                        应交:
                    </Col>
                    <Col className="gutter-row" span={18}>
                        <div className="gutter-box">
                            {(this.airConditionerMoney + this.arrangeSpendNumber).toFixed(2)}
                        </div>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default ElectricityTemp;