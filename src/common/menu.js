import { isUrl } from '../utils/utils';

const menuData = [
//   {
//   name:'统计分析',
//   icon:'bar-chart',
//   path:'analysis'
// },
{
  name:'销售',
  icon:'profile',
  path:'sale',
  children:[
    // {
    //   name:'被测单位信息',
    //   path:'company'
    // },
    // {
    //   name:'被测系统信息',
    //   path:'application'
    // },{
    //   name:'合同信息',
    //   path:'contract'
    // },
    {
      name:'项目统计表',
      path:'project-statistics.html'
    },{
      name:'信息系统情况表',
      path:'project-info'
    },{
      name:'信息系统情况定级表',
      path:'project-level'
    }
  ]
},{
  name:'项目总监',
  icon:'profile',
  path:'director',
  children:[
    // {
    //   name:'被测单位信息',
    //   path:'company'
    // },
    // {
    //   name:'被测系统信息',
    //   path:'application'
    // },{
    //   name:'合同信息',
    //   path:'contract'
    // },
    {
      name:'项目统计表',
      path:'project-statistics'
    },{
      name:'信息系统情况表',
      path:'project-info'
    },{
      name:'信息系统情况定级表',
      path:'project-level'
    },{
      name:'测试报告审核',
      path:'report-check'
    }
  ]
},{
  name:'项目经理',
  icon:'profile',
  path:'manager',
  children:[

    {
      name:'项目统计表',
      path:'project-statistics'
    },{
      name:'信息系统情况表',
      path:'project-info'
    },{
      name:'信息系统情况定级表',
      path:'project-level'
    },{
      name:'测评方案',
      path:'test-schema'
    },{
      name:'测试报告编辑',
      path:'report-edit'
    }
  ]
},{
  name:'测评师',
  icon:'profile',
  path:'tester',
  children:[
    {
      name:'项目统计表',
      path:'project-statistics'
    },{
      name:'信息系统情况表',
      path:'project-info'
    },{
      name:'信息系统情况定级表',
      path:'project-level'
    },{
      name:'机房核查表',
      path:'machine-room'
    },{
      name:'技术核查',
      path:'skill-check'
    },{
      name:'管理核查',
      path:'manage-check'
    },{
      name:'渗透测试',
      path:'filter-test'
    }
  ]
},{
  name:'基础调研',
  icon:'search',
  path:'basic-investigation'
},{
  name:'方案编制',
  icon:'book',
  path:'schema-edit'
},{
  name:'现场测评',
  icon:'form',
  path:'evaluat',
  children:[
    {
      name:'机房核查',
      path:'machine-room'
    },{
      name:'配置核查',
      path:'config-check'
    },{
      name:'渗透分析',
      path:'permeation-analysis'
    },{
      name:'制度核查',
      path:'institution-check'
    },{
      name:'风险分析',
      path:'risk-analysis'
    }
  ]
},{
  name:'报告编制',
  icon:'file',
  path:'report-edit'
},{
  name:'知识库维护',
  icon:'database',
  path:'kb',
  children:[
    {
      name:'指标库',
      path:'quota'
    },{
      name:'风险库',
      path:'risk'
    }
  ]
},{
  name:'模板维护',
  icon:'star-o',
  path:'template',
  children:[{
    name:'方案模板维护',
    path:'schema'
  },{
    name:'报告模板维护',
    path:'report'
  }]
},{
  name:'系统设置',
  icon:'setting',
  path:'sysconf',
  children:[
    {
      name:'用户管理',
      path:'usermanage'
    },{
      name:'角色管理',
      path:'rolemanage'
    },{
      name:'权限管理',
      path:'privmanage'
    },{
      name:'测评单位信息',
      path:'company-info'
    }
  ]
},
//  {
//   name: 'dashboard',
//   icon: 'dashboard',
//   path: 'dashboard',
//   children: [{
//     name: '分析页',
//     path: 'analysis',
//   }, {
//     name: '监控页',
//     path: 'monitor',
//   }, {
//     name: '工作台',
//     path: 'workplace',
//   }],
// }, {
//   name: '表单页',
//   icon: 'form',
//   path: 'form',
//   children: [{
//     name: '基础表单',
//     path: 'basic-form',
//   }, {
//     name: '分步表单',
//     path: 'step-form',
//   }, {
//     name: '高级表单',
//     authority: 'admin',
//     path: 'advanced-form',
//   }],
// }, {
//   name: '列表页',
//   icon: 'table',
//   path: 'list',
//   children: [{
//     name: '查询表格',
//     path: 'table-list',
//   }, {
//     name: '标准列表',
//     path: 'basic-list',
//   }, {
//     name: '卡片列表',
//     path: 'card-list',
//   }, {
//     name: '搜索列表',
//     path: 'search',
//     children: [{
//       name: '搜索列表（文章）',
//       path: 'articles',
//     }, {
//       name: '搜索列表（项目）',
//       path: 'projects',
//     }, {
//       name: '搜索列表（应用）',
//       path: 'applications',
//     }],
//   }],
// }, {
//   name: '详情页',
//   icon: 'profile',
//   path: 'profile',
//   children: [{
//     name: '基础详情页',
//     path: 'basic',
//   }, {
//     name: '高级详情页',
//     path: 'advanced',
//     authority: 'admin',
//   }],
// }, {
//   name: '结果页',
//   icon: 'check-circle-o',
//   path: 'result',
//   children: [{
//     name: '成功',
//     path: 'success',
//   }, {
//     name: '失败',
//     path: 'fail',
//   }],
// }, {
//   name: '异常页',
//   icon: 'warning',
//   path: 'exception',
//   children: [{
//     name: '403',
//     path: '403',
//   }, {
//     name: '404',
//     path: '404',
//   }, {
//     name: '500',
//     path: '500',
//   }, {
//     name: '触发异常',
//     path: 'trigger',
//     hideInMenu: true,
//   }],
// }, 
{
  name: '账户',
  icon: 'user',
  path: 'user',
  authority: 'guest',
  children: [{
    name: '登录',
    path: 'login',
  }, {
    name: '注册',
    path: 'register',
  }, {
    name: '注册结果',
    path: 'register-result',
  }],
}];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
