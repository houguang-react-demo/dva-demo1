import React from 'react';
import { connect } from 'dva';

function IndexPage(props) {

  console.log("index page",props)

  function addList() {
    props.dispatch({
      type:"shop/addList",
      payload:{
        title:"新增1",
        link:"https://a.b.com"
      }
    })
  }

  function addListAsync() {
    props.dispatch({
      type:"shop/addListSync",
    })
  }

  function getTopics() {
    props.dispatch({
      type:"shop/getTopics",
    })
  }

  return (
    <div>
      <button onClick={addList}>addList</button>
      <button onClick={addListAsync}>addListAsync</button>
      <button onClick={getTopics}>getTopics</button>
      <ul>
        {
          props.lists.map((item,index)=>(
            <li key={index}><a href={item.link}>{item.title}</a></li>
          ))
        }
      </ul>

      <h2>get topics</h2>
      {props.topics.loading?(<div>加载中...</div>):null}
      <ul>
        {
          props.topics.data.map((item,index)=>(
            <li key={index}>{item.title}({item.author.loginname})({item.create_at})</li>
          ))
        }
      </ul>
    </div>
  );
}

const stateToProps = ({shop})=>{
  return shop
}

export default connect(stateToProps)(IndexPage);
