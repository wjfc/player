import request from '@/service/request.js'
import { stringify } from 'qs';

export function postKeyCode(params) {
  return request.post(`/shoudong?${stringify(params)}`);
}

export function getClients() {
  return request.get("/api/v1/clients/");
}

export function getAreas() {
  return request.get("/json/secondaryArea.json");
}

export function getCategory() {
  return request.get(`/jscnCloud/api/v1/interface/cms/category?categoryId=17&pageSize=-1`)
}

export function getList(params) {
  return request.get(`/jscnCloud/api/v1/interface/cms/content?${stringify(params)}`)
}