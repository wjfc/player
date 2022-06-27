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