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

// 查询文件list
export const findyId = (data) => {
  return axios({
    url: '/loan/getById',
    method: 'post',
    data
  })
}

// 生成文档
export const generateDoc = (data) => {
  return axios({
    url: '/loan/born',
    method: 'post',
    data
  })
}
