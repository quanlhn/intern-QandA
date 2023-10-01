'use client'

import React, { useEffect, useState, useRef, useContext } from 'react';
import { Row, Col, Form, Input, DatePicker, Radio, Button, message  } from 'antd';
import { Order } from '../CustomInterface';
import { BE_API } from '../CustomInterface';
import UserContext from '../UserContext';
import type { RadioChangeEvent } from 'antd';

const Account: React.FC = () => {
    const [allOrders, setAllOrders] = useState<Array<Order>>()
    const [orderShown, setOrderShown] = useState<Array<Order>>()
    const [action, setAction] = useState('ShowOrder')
    
    const [form] = Form.useForm()
    
    const userContext = useContext(UserContext)
    const [gender, setGender] = useState(userContext.user.gender)
    const [messageApi, contextHolder] = message.useMessage()

    useEffect(() => {
        fetch(BE_API + 'orders/ordersOfUser', {
            method: 'POST',
            mode: 'cors', 
            headers: {
                'Content-Type': 'application/json'
                
            },
            body: JSON.stringify({
                userID: userContext.user.id,
            })
        })
        .then(response => response.json())
        .then(data => {
            setAllOrders(data.response)
            setOrderShown(data.response)
        })
    }, [])

    const statuses = ['Confirming', 'Confirmed', 'Shipping', 'Shipped', 'Cancelled']
    const statuses_Converted = ['Chờ xác nhận', 'Đã xác nhận', 'Đang vận chuyển', 'Đã giao xong', 'Đã hủy']

    const changeTypeOrders = (type: string) => {
        if (type != 'All') {
            const t_orders = allOrders?.filter(o => {
                // console.log(o.status)
                return o.status == type
            })
            setOrderShown(t_orders)
            // setOrderShown(t_orders?)
            
        }
    }

    const onChangeGender = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setGender(e.target.value);
    };

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const onFinish = (value: any) => {
        console.log(value.gender)
        fetch(BE_API + 'user/updateUser', {
            method: 'POST',
            mode: 'cors', 
            headers: {
                'Content-Type': 'application/json'
                
            },
            body: JSON.stringify({
                userID: userContext.user.id,
                name: value.name ? value.name : userContext.user.name,
                phone: value.phone ? value.phone : userContext.user.phoneNumber,
                email: value.email ? value.email : userContext.user.email,
                gender: value.gender ,
                birth: value.birth ? new Date(value.birth) : userContext.user.birth
            })
        })
        .then(() => {
            messageApi.open({
                type: 'success',
                content: 'Đổi thông tin thành công!',
            });
        })
    }


    return (
        // <div className='flex mt-32'>
        //     <div className="left w-40">
                // <button>Hồ sơ</button>
                // <button>Đơn mua</button>
        //     </div>
        //     <div className="right">

        //     </div>
        // </div>
        <div className='pt-32 pl-12 pr-20 bg-grey2/20 min-h-screen'>
            {contextHolder}
            <Row>
                <Col span={4}>
                    <button onClick={() => setAction('ShowProfile')}>Hồ sơ</button>
                    <br />
                    <button onClick={() => setAction('ShowOrder')}>Đơn mua</button>
                </Col>
                <Col span={20}>
                    {
                        action == 'ShowOrder' 
                        ?
                            <div>
                                <div className='buttons '> 
                                    <button onClick={() => changeTypeOrders('All')} className='text-base px-4 py-2 mx-6'>Tất cả</button>
                                    <button onClick={() => changeTypeOrders('Confirming')} className='text-base px-4 py-2 mx-6'>Chờ xác nhận</button>
                                    <button onClick={() => changeTypeOrders('Confirmed')} className='text-base px-4 py-2 mx-6'>Đã xác nhận</button>
                                    <button onClick={() => changeTypeOrders('Shipping')} className='text-base px-4 py-2 mx-6'>Đang giao</button>
                                    <button onClick={() => changeTypeOrders('Shipped')} className='text-base px-4 py-2 mx-6'>Hoàn thành</button>
                                    <button onClick={() => changeTypeOrders('Cancelled')} className='text-base px-4 py-2 mx-6'>Đã hủy</button>
                                </div>
                                {orderShown?.map((order, index) => {
                                    return <div key={index} className='w-full mb-8 mt-2 px-3 bg-white'>
                                        <div className='text-base text-right py-2'>{statuses_Converted[statuses.indexOf(order.status)]}</div>
                                        <hr />
                                        {order.products.map((product, index) => {
                                            return <div key={index} className='flex items-center mb-5 pt-2'>
                                                <img className="picture h-20 " src={product.picture}/>
                                                <div className='flex flex-col justify-between pl-4 w-full h-20'>
                                                    <div>{product.name}</div>
                                                    <div>Phân loại hàng: {product.color},{product.size}</div>
                                                    <div>x{product.amount}</div>
                                                </div>
                                                <div className='text-[#d6875c]'>
                                                    {product.price ? (product.price * product.amount).toLocaleString("de-DE") : product.price}đ
                                                </div>
                                            </div>
                                            
                                        })}
                                        <hr />
                                        <div className='text-right '>Thành tiền: <span className='text-[#d6875c] text-lg'> {order.total.toLocaleString("de-DE")}</span></div>
                                    </div>
                                })}
                            </div>
                        :
                            <div className='bg-white flex px-10 py-10 justify-center'>
                                <Form form={form} onFinish={onFinish} name='userInfo' layout='vertical' style={{width: 500}} >
                                    <Form.Item name='name' label="Tên" >
                                        <Input defaultValue={userContext.user.name} style={{width: 300}}/> 
                                    </Form.Item>
                                    <Form.Item name='phone' label="Số điện thoại" >
                                        <Input defaultValue={userContext.user.phoneNumber} style={{width: 300}}/> 
                                    </Form.Item>
                                    <Form.Item name='email' label="Email" >
                                        <Input defaultValue={userContext.user.email} style={{width: 300}}/> 
                                    </Form.Item>
                                    <Form.Item name='gender' label="Giới tính" >
                                        <Radio.Group onChange={onChangeGender} value={gender}>
                                            <Radio value='male'>Nam</Radio>
                                            <Radio value='female'>Nữ</Radio>
                                            <Radio value='other'>Khác</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item name='birth' label="Ngày sinh" >
                                        <DatePicker  />
                                    </Form.Item>
                                    <Form.Item >
                                        <Button type="primary" danger htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                    }
                </Col>
            </Row>
        </div>
    )
}

export default Account