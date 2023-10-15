import React from 'react'
import { Tag } from 'antd'
class CommonHandler {
    renderText = ()=> {
        console.log('renderText')
    }
    renderTag(text, key){
        if(text == 'y'){
            return <Tag color="#108ee9">已读</Tag>
        }
        if(text == 'n'){
            return <Tag color="volcano">未读</Tag>
        }
    }
}

export default CommonHandler