import request from '@/service/request.js'
import { stringify } from 'qs';

export function getVideoSig(params) {
  return request.get(`/wenming/tencentVideoInterface/getVideoSig?${stringify(params)}`)
}

export function peopleList(params) {
  return request.get(`/cloud/peopleList?${stringify(params)}`)
}