import axios from '../../axios'

/*
 * 1、保存
 */
export const save = (data) => {
    return axios({
      url: '/postLoanCheck/save',
        method: 'post',
        data
    })
}

/*
 * 2、已处理
 */
export const processed = (data) => {
  return axios({
    url: '/postLoanCheck/save',
    method: 'post',
    data
  })
}

// 3、分页查询
export const findPage = (data) => {
  return axios({
    url: '/postLoanCheck/findPage',
    method: 'post',
    data
  })
}

// 根据id获取基础信息数据
export const findById = (params) => {
  return axios({
    url: '/postLoanCheck/findById',
    method: 'get',
    params
  })
}

// 批量下载
export const batchDownload = (params) => {
  return axios({
    url: '/loanCheckDoc/download',
    method: 'get',
    params,
    responseType: 'blob'
  })
}

// 批量打印
export const batchPrint = (params) => {
  return axios({
    url: '/loanCheckDoc/print',
    method: 'get',
    params
  })
}

// 生成文档
export const generateDoc = (params) => {
  return axios({
    url: '/loanCheckDoc/born',
    method: 'get',
    params
  })
}

// id查询文件list
export const findByLoanCheckId = (params) => {
  return axios({
    url: '/loanCheckDoc/queryByLoanCheckId',
    method: 'get',
    params
  })
}

// 查询最近5条
export const findLastest = (params) => {
  return axios({
    url: '/postLoanCheck/findLastest',
    method: 'get',
    params
  })
}
