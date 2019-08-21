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

// 根据id查询
export const findRelatedPersonnelList = (params) => {
  return axios({
    url: '/relatedPersonnelInformation/findByBaseIdList',
    method: 'get',
    params
  })
}

// 根据id查询
export const findByBaseIdAndType = (params) => {
  return axios({
    url: '/relatedPersonnelInformation/findByBaseIdAndType',
    method: 'get',
    params
  })
}
