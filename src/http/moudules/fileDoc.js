import axios from '../axios'

// 批量下载
export const batchDownload = (params) => {
  return axios({
    url: '/file/download',
    method: 'get',
    params,
    responseType: 'blob'
  })
}

// 批量打印
export const batchPrint = (params) => {
  return axios({
    url: '/file/print',
    method: 'get',
    params
  })
}

