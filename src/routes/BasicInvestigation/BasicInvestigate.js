import React, { PureComponent, Fragment } from 'react';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message, Badge, Divider } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import StandardTable from '../../components/StandardTable';

const columns = [
    {
        title:'系统名称',
        dataIndex:'company'
    },{
        title:'系统XX',
        dataIndex:'system_no'
    },
];

const data = [
    {
        system_name:'XXXX系统1',
        system_xx:'xxxxxx',
    },{
        system_name:'XXXX系统2',
        system_xx:'xxxxxx',
    }
];

const selectedRows = [];

export default class BasicInvestigate extends PureComponent {
    state = {
        modalVisible: false,
        expandForm: false,
        selectedRows: [],
        formValues: {},
      };
    
    // componentDidMount() {
    // const { dispatch } = this.props;
    // dispatch({
    //     type: 'rule/fetch',
    // });
    // }

    render(){
        //const { rule: { data }, loading } = this.props;
        // const { selectedRows, modalVisible } = this.state;
        return (
            <PageHeaderLayout >
                {/* <StandardTable
                columns={columns}
                data={data}
                loading={loading}
                modalVisible={modalVisible}
                selectedRows={selectedRows}
                /> */}
                <StandardTable data={data}  selectedRows={selectedRows} columns={columns}/>
            </PageHeaderLayout >
        );
    };




    * g() { 
        yield 1; 
        console.log('throwing an exception'); 
        throw new Error('generator broke！'); 
        yield 2; 
        yield 3; 
      } 
       
       log(generator) { 
        var v; 
        console.log('starting generator'); 
        try { 
          v = generator.next(); // { value: undefined, done: true }    
          console.log('第一次运行next方法', v); 
        } catch (err) { 
          console.log('捕捉错误', v); 
        } 
        try { 
          v = generator.next(); 
          console.log('第二次运行next方法', v); 
        } catch (err) { 
          console.log('捕捉错误', v); 
        } 
        try { 
          v = generator.next(); 
          console.log('第三次运行next方法', v); 
        } catch (err) { 
          console.log('捕捉错误', v); 
        }   console.log('caller done'); 
    } 
     
    
    // starting generator 
    // 第一次运行next方法 { value: 1, done: false } 
    // throwing an exception 
    // 捕捉错误 { value: 1, done: false } 
    // 第三次运行next方法 { value: undefined, done: true } 
    // caller done
}