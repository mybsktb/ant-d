import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Popconfirm, Dropdown, Menu, InputNumber, DatePicker, Modal, message, Badge, Divider } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Company.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];
const columns = [
  {
    title: '系统名称',
    dataIndex: 'system_name',
    width: 150,
    fixed: 'left',
  }, {
    title: '安全等级',
    dataIndex: 'system_level',
    width: 150,
  },
  {
    title: '备案编号',
    dataIndex: 'tel',
    width: 150,
  },{
    title:'单位名称',
    dataIndex:'company',
    width:150,
  },
  {
    title: '联系人',
    dataIndex: 'contact',
    width: 150,
    /*filters: [
      {
        text: status[0],
        value: 0,
      },
      {
        text: status[1],
        value: 1,
      },
      {
        text: status[2],
        value: 2,
      },
      {
        text: status[3],
        value: 3,
      },
    ],
    render(val) {
      return <Badge status={statusMap[val]} text={status[val]} />;
    },*/
  },
  {
    title: '联系电话',
    dataIndex: 'tel',
    width: 150,
    //sorter: true,
    //render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
  },{
    title: '电子邮件',
    dataIndex: 'tel',
    width: 150,
  },{
    title: '合同签订日期',
    dataIndex: 'tel',
    width: 150,
  },{
    title: '合同金额',
    dataIndex: 'tel',
    width: 150,
  },{
    title:'收款情况',
    dataIndex:'tel',
    width:150,
  },{
    title:'系统情况表',
    width:150,
    render:()=>(
      <Fragment>
        <a href="">详情</a>
      </Fragment>
    ),
  },{
    title:'系统定级表',
    width:150,
    render:()=>(
      <Fragment>
        <a href="">详情</a>
      </Fragment>
    ),
  },
  {
    title: '操作',
    width: 130,
    fixed:'right',
    render: (text, record) => {
      const { editable } = record;
      return (
        <div className="editable-row-operations">
          {
            <span>
              <a >编辑</a>
              <Divider type='vertical'/>
              <Popconfirm title="确定删除?" >
                <a>删除</a>
              </Popconfirm>
            </span>
          }
        </div>
      );
    },
  },
];

const CreateForm = Form.create()((props) => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title="新建系统信息"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
      width={1000}
    >
    <Row gutter={24}>
      <Col span={8}>
        <FormItem
          label="系统名称"
        >
          {form.getFieldDecorator('system_name', {
            rules: [{ required: true, message: 'Please input some description...' }],
          })(
            <Input placeholder="请输入系统名称" />
          )}
        </FormItem>
      </Col>
      <Col span={8}>
        <FormItem
          label="安全等级"
        >
          {form.getFieldDecorator('system_level', {
            rules: [{ required: true, message: 'Please input some description...' }],
          })(
            <Select
            style={{width:250}}
            placeholder="请选择安全等级"
          >
            <Option value="1">一级</Option>
            <Option value="2">二级</Option>
            <Option value="3">三级</Option>
            <Option value="4">四级</Option>
          </Select>
          )}
        </FormItem>
      </Col>
      <Col span={8}></Col>
    </Row>
    <Row gutter={24}>
      <Col span={8}>
        <FormItem
          label="单位编码"
        >
          {form.getFieldDecorator('code', {
            rules: [{ required: true, message: 'Please input some description...' }],
          })(
            <Input placeholder="请输入单位编码" />
          )}
        </FormItem>
      </Col>
      <Col span={8}>
        <FormItem
          label="单位地址"
        >
          {form.getFieldDecorator('address', {
            rules: [{ required: true, message: 'Please input some description...' }],
          })(
            <Input placeholder="请输入单位地址" />
          )}
        </FormItem>
      </Col>
      <Col span={8}></Col>
    </Row>
    <Row gutter={24}>
        <Col span={8} >
        </Col>
        <Col span={8} >
        </Col>
        <Col span={8} >
        </Col>
    </Row>
      <FormItem
        label="联系人"
      >
        {form.getFieldDecorator('contact', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(
          <Input placeholder="请输入联系人" />
        )}
      </FormItem>
      <FormItem
        label="联系电话"
      >
        {form.getFieldDecorator('tel', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(
          <Input placeholder="请输入联系电话" />
        )}
      </FormItem>
    </Modal>
  );
});

@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/getData',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'rule/fetch',
      payload: params,
    });
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'rule/fetch',
      payload: {},
    });
  }

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  }

  handleMenuClick = (e) => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'rule/remove',
          payload: {
            no: selectedRows.map(row => row.no).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  }

  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }

  handleSearch = (e) => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'rule/getData',
        payload: values,
      });
    });
  }

  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }

  handleAdd = (fields) => {
    this.props.dispatch({
      type: 'rule/add',
      payload: {
        description: fields.desc,
      },
    });

    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  }

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="单位名称">
              {getFieldDecorator('company')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="单位代码">
              {getFieldDecorator('code')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="单位名称">
              {getFieldDecorator('company')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="单位代码">
              {getFieldDecorator('code')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="联系地址">
              {getFieldDecorator('address')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="联系人">
              {getFieldDecorator('contact')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </span>
        </div>
      </Form>
    );
  }

  renderForm() {
    return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const { rule: { data }, loading } = this.props;
    const { selectedRows, modalVisible } = this.state;

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <PageHeaderLayout >
        
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {/* {this.renderForm()} */}
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              {
                selectedRows.length > 0 && (
                  <span>
                    <Button>批量操作</Button>
                    <Dropdown overlay={menu}>
                      <Button>
                        更多操作 <Icon type="down" />
                      </Button>
                    </Dropdown>
                  </span>
                )
              }
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm
          {...parentMethods}
          modalVisible={modalVisible}
        />
      </PageHeaderLayout>
    );
  }
}
