import axios from '../../axios'

/*
 * 1、保存
 */
export const save = (data) => {
    return axios({
      url: '/collectionNotice/save',
        method: 'post',
        data
    })
}

/*
 * 2、已处理
 */
export const processed = (data) => {
  return axios({
    url: '/collectionNotice/save',
    method: 'post',
    data
  })
}

// 3、分页查询
export const findPage = (data) => {
  return axios({
    url: '/collectionNotice/findPage',
    method: 'post',
    data
  })
}

// 根据id获取基础信息数据
export const findById = (params) => {
  return axios({
    url: '/collectionNotice/findById',
    method: 'get',
    params
  })
}
