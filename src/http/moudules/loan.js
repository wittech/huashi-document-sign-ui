import axios from '../axios'

/*
 * 用户管理模块
 */

// 1、保存基础信息
export const save = (data) => {
    return axios({
        url: '/loan/saveBasis',
        method: 'post',
        data
    })
}

// 分页查询
export const findPage = (data) => {
  return axios({
    url: '/loan/findPage',
    method: 'post',
    data
  })
}

// 根据基础信息获取相关人员列表信息
export const findByBaseIdList = (params) => {
  return axios({
    url: '/loan/findByBaseIdList',
    method: 'get',
    params
  })
}

// 根据id获取基础信息数据
export const findById = (params) => {
  return axios({
    url: '/loan/getById',
    method: 'get',
    params
  })
}

// 基础信息id查询文件list
export const queryByLoanBasisId = (params) => {
  return axios({
    url: '/loan/queryByLoanBasisId',
    method: 'get',
    params
  })
}

// 生成文档
export const generateDoc = (params) => {
  return axios({
    url: '/loan/born',
    method: 'get',
    params
  })
}

// 根据基础id获取 引用房产 和土地信息
export const findByLoanBasisIdList = (params) => {
  return axios({
    url: '/loan/findByLoanBasisIdList',
    method: 'get',
    params
  })
}

// 根据根据id查询数据
export const getByKeyId = (params) => {
  return axios({
    url: '/loan/getByKeyId',
    method: 'get',
    params
  })
}
