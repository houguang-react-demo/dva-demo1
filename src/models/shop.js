import {cloneDeep, concat} from "lodash";
import * as apis from "../services/example";

export default {
  namespace:"shop",
  state:{
    lists:[
      {title:"标题一",link:"https://a.com"},
      {title:"标题二",link:"https://a.com"},
      {title:"标题三",link:"https://a.com"},
    ],
    topics:{
      loading:false,
      data:[]
    }
  },
  reducers:{
    addList(state, {payload}){
      let newState = cloneDeep(state);
      newState.lists = concat(newState.lists,payload)
      return newState
    },
    //topics数据处理
    setTopicsLoading(state) {
      let newState = cloneDeep(state);
      newState.topics.loading = !newState.topics.loading;
      return newState
    },
    addTopicsData(state, {payload}){
      let newState = cloneDeep(state);
      newState.topics.data = payload
      console.log(newState)
      return newState
    },

  },
  //异步函数
  effects:{
    *addListSync({payload},{put}){
      yield put({
        type:"addList",
        payload:{
          title:"sync 新增1",
          link:"https://a.b.com"
        }
      })
    },
    *getTopics({payload},{put,call}){
      yield put({type:"setTopicsLoading"})
      const res = yield call(apis.getTopics)
      if (res.data.success){
        yield put({
          type:"addTopicsData",
          payload:res.data.data,
        })
        yield put({type:"setTopicsLoading"})
      }
    }
  },
  subscriptions:{
    getData({dispatch,history}){
      console.log("subscriptions get data")
      history.listen(({pathname})=>{

      })
    }
  }
}
