import request from '../utils/request';

export function query() {
  return request('/api/users');
}

const proxy = "/apis/"
export function getTopics(){
  return request(`${proxy}/api/v1/topics`)
}
