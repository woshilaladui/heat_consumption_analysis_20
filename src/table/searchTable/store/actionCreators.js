import * as constants from './constants';

/**
 * 修改搜索时间
 */
export const changeSearchTime = (date) => ({
    type: constants.UPDATE_SEARCH_DATE,
    date: date
});

/**
 * 修改表格模式   填写模式和查看模式
 */
export const changeSearchFlag = (searchFlag) => ({
    type: constants.UPDATE_SEARCH_FLAG,
    searchFlag: searchFlag
});
