// import React, { useEffect, useState, forwardRef } from 'react';
// import { observer, inject, Provider } from 'mobx-react';
// import { Table, Button, Input } from 'antd';

// export default class DynamicCom extends React.Component {
//     constructor(props) {
//         super(props);
//         console.log('props: ', props);
//     }

//     render() {
//         return <Input ref={this.props.xref} />;
//     }
// }

// function Text(props, forwardRef) {
//     return <input ref={forwardRef} />
//   }

//   export default React.forwardRef(Text)
import { useRef, useEffect, forwardRef } from 'react';
import React from 'react';
import { Input } from 'antd';

// const DynamicCom = forwardRef(function (props, ref) {
//     return <div ref={ref}>Hello, World!</div>;
// });

const DynamicCom = async () => {
    return <div>Hello, World!</div>;
};

export default DynamicCom;
