import axios from '../axios'

// 批量下载
export const batchDownload = (params) => {
  return axios({
    url: '/loan/download',
    method: 'get',
    params,
    responseType: 'blob'
  })
};

// 批量打印
export const batchPrint = (params) => {
  return axios({
    url: '/loan/print',
    method: 'get',
    params
  })
};

// 上传
export const fileUpload = (params) => {
  return axios({
    url: '/file/upload',
    method: 'post',
    headers: {'Content-Type':'multipart/form-data'},
    params
  })
};
