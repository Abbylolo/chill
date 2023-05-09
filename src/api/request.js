import axios from "axios";
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // 外网更新
  // baseURL: 'http://xxxxx',
  // baseURL: "http://127.0.0.1:3309/",
  timeout: 5000 // request timeout
});

export default service;
