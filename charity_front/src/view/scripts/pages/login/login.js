import React, {useState} from "react";
import {Form, Input, Button, Checkbox, Typography, Divider, Layout, Row, Col} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {Link, useHistory} from 'react-router-dom';
import 'antd/dist/antd.css';
import {RollbackOutlined} from '@ant-design/icons'
import {setState} from 'react'


const Login = () => {

  const { Header, Content, Footer } = Layout;
  const { Text } = Typography;
  const [signInBtnClicked,setSignInBtnClicked ]= useState(false)

  const onFinish = (values) => {
    console.log('Success:', values);
    setSignInBtnClicked(true);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  

  return (
    <Layout style={{height:'100vh'}}  >


      <Row justify="space-around" align="middle">

        <Col span={8}></Col>
        <Col span={8} style={{top:'100px'}}>


          <Content style={{padding: '24px 24px', background: '#fff'}}>

            <div style={{direction: 'rtl', padding: '0px 24px'}}>
              <Link to="/" style={{fontSize: '20px' ,color: '#000000', direction: 'rtl'}} >بازگشت‌</Link>
            </div>


            <Form
            style={{ padding: '24px 20px'}}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>

              <Form.Item
                label="نام کاربری"
                name="username"
                style={{direction:'rtl'}}
                rules={[{ required: true, message: 'لطفا نام کاربری خود را وارد کنید' }]}>
                <Input     style={{direction:'ltr'}} disabled={signInBtnClicked} />
              </Form.Item>
            
            
              <Form.Item
                label="رمـز عـبـور"
                name="password"
                style={{direction:'rtl'}}
                rules={[{ required: true, message: 'لطفا رمز عبور خود را وارد کنید' }]}>
                <Input.Password style={{direction:'ltr'}} disabled={signInBtnClicked} />  
              </Form.Item>
            
              <Form.Item name="remember" valuePropName="checked" >
                <Checkbox disabled={signInBtnClicked}>Remember me</Checkbox>
              </Form.Item>
            
              <Form.Item >
                <Button type="primary" htmlType="submit" loading={signInBtnClicked} >ورود</Button>
              </Form.Item>


                
            </Form>

            <div style={{direction:'ltr'}} >
              <Text style={{fontSize: '20px' ,color: '#000000'}} >حساب کاربری ندارید؟ </Text>
              <Link to="/signup" style={{fontSize: '20px'}} >ثبت نام کنید</Link>
            </div>
                
          </Content>
                
                
        </Col>
        <Col span={8}></Col>

      </Row>
              
    </Layout>

  );
  };

export default Login;