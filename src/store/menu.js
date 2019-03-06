const items = [
  {
    title: '企业管理',
    path: '/corp',
    icon: 'corp',
    module: 'jobs',
    children: [
      {
        title: '注册审核',
        path: '/check',
        icon: 'shenhe',
        children: [
          {
            title: '已审核',
            path: '/corp/0/register',
            icon: 'shenhe',
          },
          {
            title: '待审核',
            path: '/corp/2/register',
            icon: 'shenhe',
          },
          {
            title: '审核拒绝',
            path: '/corp/3/register',
            icon: 'shenhe',
          },
          {
            title: '信息未完善',
            path: '/corp/1/register',
            icon: 'shenhe',
          },
        ],
      },
      {
        title: '企业信息总库',
        path: '/corp/info',
        icon: 'renzheng',
      },
      // {
      //   title: '积分体系',
      //   path: '/corp/points',
      //   icon: 'jifen',
      // },
      // {
      //   title: '企业用户',
      //   path: '/corp/user',
      //   icon: 'corpuser',
      // },
    ],
  },
  {
    title: '招聘信息',
    path: '/jobinfo',
    icon: 'job',
    module: 'jobs',
    children: [
      {
        title: '待审核信息',
        path: '/jobinfo/1',
        icon: 'info',
      },
      {
        title: '已发布信息',
        path: '/jobinfo/0',
        icon: 'info',
      },
      {
        title: '审核失败信息',
        path: '/jobinfo/2',
        icon: 'info',
      },
    ],
  },
  {
    title: '招聘会',
    path: '/jobfair',
    icon: 'job',
    module: 'jobs',
    children: [
      {
        title: '筹备中',
        path: '/jobfair/0',
        icon: 'info',
      },
      {
        title: '已发布',
        path: '/jobfair/1',
        icon: 'info',
      },
    ],
  },
  {
    title: '校园宣讲会',
    path: '/campus',
    icon: 'job',
    module: 'jobs',
    children: [
      {
        title: '待审核',
        path: '/campus/1',
        icon: 'info',
      },
      {
        title: '已发布',
        path: '/campus/0',
        icon: 'info',
      },
    ],
  },
];

const MapMenu = (catalog = []) => item => ({
  title: item.title,
  options: {
    icon: item.icon,
    path: item.path,
    url: item.url,
    target: item.target,
    tooltip: item.tooltip,
    module: item.module,
    platform: item.platform,
    roles: item.roels,
    tags: item.tags,
    meta: { catalog: catalog.concat(item.title) },
  },
  children: (item.children || []).map(MapMenu(catalog.concat(item.title))),
});

// initial state
export const state = () => ({
  items: items.map(MapMenu()),
});
