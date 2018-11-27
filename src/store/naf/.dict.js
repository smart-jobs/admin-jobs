// mutation types
export const LOADED = 'LOADED';

export const PRESET = {
  status: [{ code: '0', name: '正常' }, { code: '1', name: '挂起' }, { code: '2', name: '注销' }],
  usage: [{ code: '0', name: '正常' }, { code: '1', name: '停用' }],
  corpcode: [{ code: '0', name: '统一社会信用代码' }, { code: '1', name: '单位组织机构代码' }],
  xb: [{ code: '1', name: '男' }, { code: '2', name: '女' }],
  xl: [
    { code: '41', name: '专科' },
    { code: '31', name: '本科' },
    { code: '11', name: '硕士' },
    { code: '01', name: '博士' },
    { code: '51', name: '中专' },
    { code: '61', name: '高职' },
  ],
};
