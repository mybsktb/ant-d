import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import pathToRegexp from 'path-to-regexp';
import { getMenuData } from './menu';

let routerDataCache;

const modelNotExisted = (app, model) => (
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  })
);

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach((model) => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return (props) => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () => models.filter(
      model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)
    ),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then((raw) => {
        const Component = raw.default || raw;
        return props => createElement(Component, {
          ...props,
          routerData: routerDataCache,
        });
      });
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach((item) => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

export const getRouterData = (app) => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    },
    '/dashboard/analysis': {
      component: dynamicWrapper(app, ['chart'], () => import('../routes/Dashboard/Analysis')),
    },
    '/dashboard/monitor': {
      component: dynamicWrapper(app, ['monitor'], () => import('../routes/Dashboard/Monitor')),
    },
    '/dashboard/workplace': {
      component: dynamicWrapper(app, ['project', 'activities', 'chart'], () => import('../routes/Dashboard/Workplace')),
      // hideInBreadcrumb: true,
      // name: '工作台',
      // authority: 'admin',
    },
    '/form/basic-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/BasicForm')),
    },
    '/form/step-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm')),
    },
    '/form/step-form/info': {
      name: '分步表单（填写转账信息）',
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step1')),
    },
    '/form/step-form/confirm': {
      name: '分步表单（确认转账信息）',
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step2')),
    },
    '/form/step-form/result': {
      name: '分步表单（完成）',
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step3')),
    },
    '/form/advanced-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/AdvancedForm')),
    },
    '/list/table-list': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/List/TableList')),
    },
    '/list/basic-list': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/BasicList')),
    },
    '/list/card-list': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/CardList')),
    },
    '/list/search': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/List')),
    },
    '/list/search/projects': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/Projects')),
    },
    '/list/search/applications': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/Applications')),
    },
    '/list/search/articles': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/Articles')),
    },
    '/profile/basic': {
      component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/BasicProfile')),
    },
    '/profile/advanced': {
      component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/AdvancedProfile')),
    },
    '/result/success': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Success')),
    },
    '/result/fail': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Error')),
    },
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
    },
    '/exception/trigger': {
      component: dynamicWrapper(app, ['error'], () => import('../routes/Exception/triggerException')),
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/User/UserLogin')),
    },
    '/user/register': {
      component: dynamicWrapper(app, ['register'], () => import('../routes/User/UserRegister')),
    },
    '/user/register-result': {
      component: dynamicWrapper(app, [], () => import('../routes/User/RegisterResult')),
    },
    // 系统设置
    '/sysconf/usermanage':{
      component:dynamicWrapper(app,['sysconf'],() => import('../routes/Sysconf/UserManage')),
    },
    '/sysconf/rolemanage':{
      component:dynamicWrapper(app,['sysconf'],() => import('../routes/Sysconf/RoleManage')),
    },
    '/sysconf/privmanage':{
      component:dynamicWrapper(app,['sysconf'],() => import('../routes/Sysconf/PrivManage')),
    },
    // 统计分析
    '/analysis':{
      component:dynamicWrapper(app,['analysis'],() => import('../routes/Analysis/Analysis')),
    },
    // 项目信息
    '/projectinfo/company':{
      component:dynamicWrapper(app,['projectinfo'],() => import('../routes/Project/Company')),
    },
    '/projectinfo/application':{
      component:dynamicWrapper(app,['projectinfo'],() => import('../routes/Project/Application')),
    },
    '/projectinfo/contract':{
      component:dynamicWrapper(app,['projectinfo'],() => import('../routes/Project/Contract')),
    },
    '/projectinfo/project-statistics':{
      component:dynamicWrapper(app,['projectinfo'],() => import('../routes/Project/ProjectStatistics')),
    },
    // 知识库维护
    '/kb/quota':{
      component:dynamicWrapper(app,['kb'],() => import('../routes/Kb/Quota')),
    },
    '/kb/risk':{
      component:dynamicWrapper(app,['kb'],() => import('../routes/Kb/Risk')),
    },
    // 模板维护
    '/template/schema':{
      component:dynamicWrapper(app,['template'],() => import('../routes/Template/Schema')),
    },
    '/template/report':{
      component:dynamicWrapper(app,['template'],() => import('../routes/Template/Report')),
    },
    '/basic-investigation':{
      component:dynamicWrapper(app,['investigate'],() => import('../routes/BasicInvestigation/BasicInvestigate')),
    },
    
    // 销售
    '/sale/project-statistics.html':{
      component:dynamicWrapper(app,['projectinfo'],() => import('../routes/Project/ProjectStatistics')),
    },
    '/sale/project-info':{
      component:dynamicWrapper(app,['projectinfo'],() => import('../routes/Project/ProjectStatistics')),
    },
    '/sale/project-level':{
      component:dynamicWrapper(app,['projectinfo'],() => import('../routes/Project/ProjectStatistics')),
    },
    // 项目总监
    '/director/project-statistics':{
      component:dynamicWrapper(app,['projectinfo'],() => import('../routes/Project/ProjectStatistics')),
    },
    '/director/project-info':{
      component:dynamicWrapper(app,['projectinfo'],() => import('../routes/Project/ProjectStatistics')),
    },
    '/director/project-level':{
      component:dynamicWrapper(app,['projectinfo'],() => import('../routes/Project/ProjectStatistics')),
    },
    '/director/report-check':{
      component:dynamicWrapper(app,['projectinfo'],() => import('../routes/Project/ProjectStatistics')),
    },
    // 项目经理
    '/manager/project-statistics':{
      component:dynamicWrapper(app,['projectinfo'],() => import('../routes/Project/ProjectStatistics')),
    },
    '/manager/project-info':{
      component:dynamicWrapper(app,['projectinfo'],() => import('../routes/Project/ProjectStatistics')),
    },
    '/manager/project-level':{
      component:dynamicWrapper(app,['projectinfo'],() => import('../routes/Project/ProjectStatistics')),
    },
    '/manager/test-schema':{
      component:dynamicWrapper(app,['projectinfo'],() => import('../routes/Project/ProjectStatistics')),
    },
    // 测评师
    '/tester/project-statistics':{
      component:dynamicWrapper(app,['projectinfo'],() => import('../routes/Project/ProjectStatistics')),
    },
    '/tester/project-info':{
      component:dynamicWrapper(app,['projectinfo'],() => import('../routes/Project/ProjectStatistics')),
    },
    '/tester/project-level':{
      component:dynamicWrapper(app,['projectinfo'],() => import('../routes/Project/ProjectStatistics')),
    },
    '/tester/machine-room':{
      component:dynamicWrapper(app,['projectinfo'],() => import('../routes/Project/ProjectStatistics')),
    },
    '/tester/skill-check':{
      component:dynamicWrapper(app,['projectinfo'],() => import('../routes/Project/ProjectStatistics')),
    },
    '/tester/manage-check':{
      component:dynamicWrapper(app,['projectinfo'],() => import('../routes/Project/ProjectStatistics')),
    },
    '/tester/filter-test':{
      component:dynamicWrapper(app,['projectinfo'],() => import('../routes/Project/ProjectStatistics')),
    },

    // 
    // '/user/:id': {
    //   component: dynamicWrapper(app, [], () => import('../routes/User/SomeComponent')),
    // },
  };
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData = {};
  // The route matches the menu
  Object.keys(routerConfig).forEach((path) => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`));
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
    };
    routerData[path] = router;
  });
  return routerData;
};
