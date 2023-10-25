import { Button, Form, Icon, Input, message, Radio, Select, Upload } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import api from '../../../api/api';
const plainOptions = [
    { label: '是', value: 'y' },
    { label: '否', value: 'n' }
];
const options = [
    { label: '是', value: 'y' },
    { label: '否', value: 'n' }
];

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            department: '',
            role_code: '',
            user: '',
            email: '',
            mobile: '',
            receive_mail_notify: '',
            receive_sms_notify: '',
            loading: false,
            imageUrl: '',
            authorization: '',
            roleList: [],
            deptList: []
        };
        this.submit = this.submit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.roleonChange = this.roleonChange.bind(this);
        this.deptonChange = this.deptonChange.bind(this);
    }
    async componentDidMount() {
        this.getprofile();
        let auth_code = sessionStorage.getItem('token');
        this.setState({
            authorization: auth_code
        });
        let params = { data: { currentPage: 1, pageSize: 1000 }, method: 'POST' };
        let res = await api.permission.getRoleList(params);
        if (res.code == 200) {
            this.setState({
                roleList: res.data
            });
        }
    }
    async getprofile() {
        let res = await api.user.profile({ method: 'POST' });
        if (res.code == '200') {
            this.setState({
                department: res.data.deptid,
                role_code: res.data.role_code,
                user: res.data.user,
                email: res.data.email,
                mobile: res.data.mobile,
                receive_mail_notify: res.data.receive_mail_notify != null ? res.data.receive_mail_notify : '',
                receive_sms_notify: res.data.receive_sms_notify != null ? res.data.receive_sms_notify : '',
                receive_dingtalk_notify:
                    res.data.receive_dingtalk_notify != null ? res.data.receive_dingtalk_notify : '',
                imageUrl: res.data.head_portrait
            });
        }
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    async submit() {
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (err) {
                return;
            }
            let data = {
                deptid: this.state.department,
                role_code: this.state.role_code,
                email: this.state.email,
                receive_mail_notify: this.state.receive_mail_notify,
                receive_sms_notify: this.state.receive_sms_notify,
                receive_dingtalk_notify: this.state.receive_dingtalk_notify
            };
            let params = { method: 'POST', data: data };
            await api.user.updateUserInformation(params);
        });
    }

    handleChange = (info) => {
        console.log(info.file);
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, (imageUrl) =>
                this.setState({
                    imageUrl,
                    loading: false
                })
            );
        }
    };
    roleonChange(e) {
        this.setState({
            role_code: e
        });
    }
    roleonSearch() {}
    deptonChange(e) {
        this.setState({
            department: e
        });
    }
    checkAccount(rule, value, callback) {
        var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;

        if (re.test(value)) {
            callback();
        } else {
            callback('请输入正确格式');
        }
    }
    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
            </div>
        );
        const { imageUrl } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{ margin: '50px auto', width: '600px' }}>
                <Form labelCol={{ span: 7 }} wrapperCol={{ span: 10 }}>
                    <Form.Item label="修改头像" hasFeedback>
                        <Upload
                            data={{ source: 'avatar' }}
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action={api.filehandler.uploadFile}
                            headers={{ Authorization: this.state.authorization }}
                            beforeUpload={beforeUpload}
                            onChange={this.handleChange}>
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    </Form.Item>

                    <Form.Item label="角色：" hasFeedback>
                        {getFieldDecorator('role_code', {
                            rules: [
                                {
                                    required: true,
                                    message: '角色不能为空'
                                }
                            ],
                            initialValue: this.state.role_code
                        })(
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                optionFilterProp="children"
                                onChange={this.roleonChange}
                                onSearch={this.roleonSearch}
                                // value={this.state.role_code}
                            >
                                {this.state.roleList.map((item) => {
                                    return (
                                        <Select.Option name="role_code" key={item.role_code}>
                                            {item.role_name}
                                        </Select.Option>
                                    );
                                })}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="邮箱：" hasFeedback>
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    required: true,
                                    message: '邮箱不能为空'
                                },
                                {
                                    validator: this.checkAccount
                                }
                            ],
                            initialValue: this.state.email
                        })(<Input name="email" onChange={this.onChange} />)}
                    </Form.Item>
                    <Form.Item label="手机号：" hasFeedback>
                        {getFieldDecorator('mobile', {
                            rules: [
                                {
                                    required: true,
                                    message: '手机号不能为空'
                                }
                            ],
                            initialValue: this.state.mobile
                        })(<Input disabled />)}
                    </Form.Item>
                    <Form.Item style={{ padding: '0px 0px 0px 95px' }} label="是否接受邮件通知：" hasFeedback>
                        <Radio.Group
                            name="receive_mail_notify"
                            options={plainOptions}
                            onChange={this.onChange}
                            value={this.state.receive_mail_notify}
                        />
                    </Form.Item>
                    <Form.Item style={{ padding: '0px 0px 0px 95px' }} label="是否接受短信通知" hasFeedback>
                        <Radio.Group
                            name="receive_sms_notify"
                            options={options}
                            onChange={this.onChange}
                            value={this.state.receive_sms_notify}
                        />
                    </Form.Item>

                    <Form.Item style={{ padding: '0px 0px 0px 220px' }}>
                        <Button type="primary" onClick={this.submit}>
                            保存
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
export default Form.create()(Profile);
