import * as React from 'react';
import { Form, DatePicker, Input } from 'antd';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

interface Iprops{
    name: string,
    form: any
}

class ElectricityTemp extends React.Component<Iprops, any> {

    constructor(props: any){
        super(props);
    }

    public render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                sm: { span: 8 },
                xs: { span: 24 },
            },
            wrapperCol: {
                sm: { span: 16 },
                xs: { span: 24 },
            },
        };
        const rangeConfig = {
            rules: [{ type: 'array', required: true, message: 'Please select time!' }],
        };
        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="房间名"
                >
                    <Input placeholder="房间名"/>

                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="上次电表量"
                >
                    <Input placeholder="度数"/>

                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="本次电表量"
                >
                    <Input placeholder="度数"/>

                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="时间"
                >
                    {getFieldDecorator('range-picker', rangeConfig)(
                        <RangePicker />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="空调费"
                >
                    。。。
                </FormItem>
            </Form>
        );
    }
}

const WrappedTimeRelatedForm = Form.create()(ElectricityTemp);

export default WrappedTimeRelatedForm;