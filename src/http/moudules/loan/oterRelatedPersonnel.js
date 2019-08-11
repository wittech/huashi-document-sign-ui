import axios from '../../axios'

/*
 * 2、保存借款人情况
 */
export const save = (data) => {
  return axios({
    url: '/loan/saveOterBorrower',
    method: 'post',
    data
  })
}
