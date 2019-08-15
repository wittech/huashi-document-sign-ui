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

// 批量下载
export const batchDownload = (params) => {
  return axios({
    url: '/loanNoticeDoc/download',
    method: 'get',
    params,
    responseType: 'blob'
  })
}

// 批量打印
export const batchPrint = (params) => {
  return axios({
    url: '/loanNoticeDoc/print',
    method: 'get',
    params
  })
}

// 生成文档
export const generateDoc = (params) => {
  return axios({
    url: '/loanNoticeDoc/born',
    method: 'get',
    params
  })
}

// id查询文件list
export const findByLoanNoticeId = (params) => {
  return axios({
    url: '/loanNoticeDoc/findByLoanNoticeId',
    method: 'get',
    params
  })
}
