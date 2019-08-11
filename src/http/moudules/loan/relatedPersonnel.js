import axios from '../../axios'

/*
 * 2、保存借款人情况
 */
export const save = (data) => {
    return axios({
      url: '/loan/saveBorrower',
        method: 'post',
        data
    })
}

// 分页查询
export const findByBaseIdList = (data) => {
  return axios({
    url: '/loan/findByBaseIdList',
    method: 'post',
    data
  })
}
