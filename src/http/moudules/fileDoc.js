import axios from '../axios'

// 批量下载
export const batchDownload = (params) => {
  return axios({
    url: '/file/download',
    method: 'get',
    params
  })
}
