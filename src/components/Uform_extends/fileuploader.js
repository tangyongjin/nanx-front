import React from 'react';
import { Upload, Button, Icon, message } from 'antd';
import api from '../../api/api';
import reqwest from 'reqwest';

export default class Fileuploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            defaultValue: null,
            uploading: false
        };
    }

    handleUpload = () => {
        const { fileList } = this.state;
        var formData = new FormData();
        fileList.forEach((file, index) => {
            if (file.type != undefined) {
                if (this.props.value.indexOf(file.name.split('.')[0]) == -1) {
                    formData.append(index, file);
                }
            }
        });
        this.setState({
            uploading: true
        });
        reqwest({
            url: api.file.upload,
            method: 'post',
            headers: {
                Authorization: localStorage.getItem('token')
            },
            processData: false,
            data: formData,
            success: (res) => {
                this.setState({
                    uploading: false
                });
                let resp = JSON.parse(res);
                if (resp.code == '200') {
                    var data = resp.data;
                    if (this.props.value != '') {
                        let fileList = JSON.parse(this.props.value);
                        var fileLista = fileList.toString();
                        var fileListb = data.toString();
                        let filelistt = fileList.concat(data);
                        const obj = {};
                        const newObjArr = [];
                        for (let i = 0; i < filelistt.length; i++) {
                            if (!obj[filelistt[i].name]) {
                                newObjArr.push(filelistt[i]);
                                obj[filelistt[i].name] = true;
                            }
                        }
                        var json = JSON.stringify(newObjArr);
                    } else {
                        var json = JSON.stringify(data);
                    }
                    this.props.onChange(json);
                    if (data.length != 0) {
                        // message.success('上传成功');
                    } else {
                        message.error('文件已存在');
                    }
                    this.setState({
                        fileList: []
                    });
                } else {
                    message.error('存在不支持的文件类型');
                }
            },
            error: () => {
                message.error('upload failed.');
            }
        });
    };
    deleteFile(fileurl) {
        var arr = JSON.parse(this.props.value);
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].url == fileurl) {
                arr.splice(arr.indexOf(arr[i]), 1);
            }
        }
        var newarrstr = JSON.stringify(arr);
        this.props.onChange(newarrstr);

        // if(this.props.commontablestore.selectedRows.length==0){
        let params = {
            method: 'POST',
            data: {
                file: fileurl
            }
        };
        let res = api.file.deleteFiles(params);
        if (res.code == '200') {
            // message.success("删除附件成功")
        }
        // }
        //"filename": fileurl,
        // "table":this.props.commontablestore.base_table,
        // "id":this.props.commontablestore.selectedRows[0].id,
        // "uploadname":this.props.field_id
    }
    getFilesList() {
        console.log('文件上传组件props', this.props);
        if (this.props.value != '') {
            var fileListt = JSON.parse(this.props.value);
            var num = 0;
            for (var i = 0; i < fileListt.length; i++) {
                num++;
                fileListt[i].uid = num;
                fileListt[i].status = 'done';
            }

            var fileList = fileListt.concat(this.state.fileList);
        } else {
            var { fileList } = this.state;
        }
        return fileList;

        //
    }

    render() {
        console.log(this.props);

        const { uploading, fileList } = this.state;
        const props = {
            multiple: true,
            onChange: ({ file, fileList }) => {},
            onRemove: (file) => {
                this.setState((state) => {
                    if (file.type == undefined) {
                        this.deleteFile(file.url);
                    } else {
                    }
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(
                    (state) => ({
                        fileList: [...state.fileList, file]
                    }),
                    () => {
                        this.handleUpload();
                    }
                );
                return false;
            },
            fileList: this.getFilesList()
        };

        return (
            <div>
                <Upload {...props}>
                    {/* 
           由于上传组件在参考区直接使用普通渲染,因此永远不会disdabled
          <Button disabled={this.props.uform_para&&this.props.uform_para=='true'?false:true}>
            <Icon type="upload" /> 选择文件
           </Button> 
           
           */}

                    <Button>
                        <Icon type="upload" /> 选择文件
                    </Button>
                </Upload>
            </div>
        );
    }
}
