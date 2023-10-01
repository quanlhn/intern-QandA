'use client'

import React, { useEffect, useState, useRef, useContext } from 'react';
import { BE_API, Product } from '../CustomInterface';
import { Space, Table, Tag, Select, Tooltip, RefSelectProps, Form, Button, Input } from 'antd';
import type { FormInstance } from 'antd';
import UserContext from "../UserContext";
import { ColumnsType, TableProps } from 'antd/es/table';


interface DataTable {
    key: React.Key,
    id: string,
    customerName: String,
    products: Array<Product>,
    address: string,
    date: Date,
    total: number,
    status: string,


}


const Management: React.FC = () => {

    const [orders, setOrders] = useState()
    const [orderShown, setOrderShown] = useState([])
    const [count, setCount] = useState(0)
    const [action, setAction] = useState('OrderManagement')
    const [staffs, setStaffs] = useState([])
    const user = useContext(UserContext)

    const { Column } = Table;

    const [form] = Form.useForm();

    useEffect(() => {
        fetch(BE_API + 'user/findStaffs')
        .then(response => response.json())
        .then(data => {
            setStaffs(() => data.response.map((staff: any) => {
                return {
                    id: staff._id,
                    name: staff.name,
                    phone: staff.phone,
                    email: staff.email,
                    role: staff.role
                }
            }))
        })
    }, [action])

    const deleteStaff = (record: any) => {
        fetch(BE_API + 'user/deleteUser', {
            method: 'POST',
            mode: 'cors', 
            headers: {
                'Content-Type': 'application/json'
                
            },
            body: JSON.stringify({
                id: record.id,
            })
        })
        .then(() => {
            if (staffs ) {
                let newStaffs = staffs.filter(staff => staff['id'] !== record.id)
                setStaffs(newStaffs)
            }
        })
    }


    useEffect(() => {
        fetch(BE_API + 'orders/')
        .then(response => response.json())
        .then(data => {
            const allCarts = []
            data.response.forEach((cart: any, index: any) => {
                const date = new Date(cart.createdAt)
                setOrders(data.response)
                setOrderShown(() => data.response.map((cart: any) => {
                    return {
                        products: cart.products,
                        id: cart._id,
                        customerName: cart.customerName,
                        address: cart.address + ', ' + cart.ward + ', ' + cart.district + ', ' + cart.province,
                        total: cart.total,
                        status: cart.status,
                        date: new Date(cart.createdAt),
                        userID: cart.userID
                    }
                }))
            })
        })
        // console.log(orderShown)
    },[count])
    
    const addUser = () => {
        console.log(form.getFieldsValue())
        fetch('http://localhost:8080/api/register', {
            method: 'POST',
            mode: 'cors', 
            headers: {
                'Content-Type': 'application/json'
                
            },
            body: JSON.stringify({
                name: form.getFieldsValue().name,
                email: form.getFieldsValue().email,
                phone: form.getFieldsValue().phone,
                password: form.getFieldsValue().password,
                role: form.getFieldsValue().role
            })
        })
            .then(res => res.json())
            .then(() => alert('store user successfully'))
    }

    const SubmitButton = ({ form }: { form: FormInstance }) => {
        const [submittable, setSubmittable] = React.useState(false);
      
        // Watch all values
        const values = Form.useWatch([], form);
      
        useEffect(() => {
          form.validateFields({ validateOnly: true }).then(
            () => {
              setSubmittable(true);
            },
            () => {
              setSubmittable(false);
            },
          );
        }, [values]);
      
        return (
          <Button onClick={addUser} type="primary" htmlType="submit" disabled={!submittable} danger>
            Submit
          </Button>
        );
      };

    const statuses = ['Confirming', 'Confirmed', 'Shipping', 'Shipped', 'Cancelled']
    const statuses_Converted = ['Chờ xác nhận', 'Đã xác nhận', 'Đang vận chuyển', 'Đã giao xong', 'Đã hủy']

    const handeleChangeStatus = (value: string, record: any) => {
        console.log(`selected: ${value}`)
        record.status = value  
    }

    const isOptionDisabled = (value: string, status: any) => {
        if (statuses.indexOf(status) > statuses.indexOf(value) || statuses.indexOf(status) >= 3 ) {
            return true
        } else {
            return false
        }

    }

    const submitAction = (record: any, index: any) => {
        console.log(record.status)
        console.log(record.id)
        fetch(BE_API + 'orders/update', {
            method: 'POST',
            mode: 'cors', 
            headers: {
                'Content-Type': 'application/json'
                
            },
            body: JSON.stringify({
                orderID: record.id,
                status: record.status
            })
        })
        .then(() => {
            setCount(() => count + 1)
            alert('Update status successfully')
        })
    }

    const columns: ColumnsType<DataTable> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '7rem',
            render: (text :any) => <div className=''><Tooltip placement='top' title={text}>{text.slice(0, 8)}. . .</Tooltip></div> 
        },
        {
            title: 'Tên người nhận',
            dataIndex: 'customerName',
            key: 'customerName',
            width: "12rem",
            render: (text :any) => <div>{text}</div>
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'products',
            key: 'products',
            width: "22rem",
            render: (products :any) => (
                <div>
                    {products.map((product: any, index: any) => (
                        <div key={index}>
                            <div>{product.amount} {product.name}</div>
                            <div>{product.size}/{product.color}</div>
                        </div>
                    ))}
                </div>
            )
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            render: (text :any) => <div>{text}</div>
        },
        {
            title: 'Thời gian đặt hàng',
            dataIndex: 'date',
            key: 'date',
            render: (date :any) => <div>{date.getDate() + '/' + date.getMonth() + '/'  + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes()}</div>
        },
        {
            title: 'Thành tiền',
            dataIndex: 'total',
            key: 'total',
            render: (text :any) => <div>{text}</div>
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            filters: [
                {
                    text: 'Chờ xác nhận',
                    value: 'Confirming'
                },
                {
                    text: 'Đã xác nhận',
                    value: 'Confirmed'
                },
                {
                    text: 'Đang vận chuyển',
                    value: 'Shipping'
                },
                {
                    text: 'Đã giao xong',
                    value: 'Shipped'
                },
                {
                    text: 'Đã hủy',
                    value: 'Cancelled'
                }
                
            ],
            filterMode: 'tree',
            onFilter: (value: string | number | boolean, record: DataTable) => record.status.includes(value.toString()) ? true : false,
            render: (status :any, record: any, index: any) => (
                <div>
                    <Select
                        defaultValue={statuses_Converted[statuses.indexOf(status)]}
                        style={{width: '10rem'}}
                        onChange={(value) => handeleChangeStatus(value, record)}
                        // options={[
                        //     {vale: 'Confirming', label: 'Chờ xác nhận'},
                        //     {vale: 'Confirmed', label: 'Đã xác nhận'},
                        //     {vale: 'Shipping', label: 'Đang vận chuyển'},
                        //     {vale: 'Shipped', label: 'Đã giao xong'},
                        //     {vale: 'Canceled', label: 'Đã hủy', disabled: true},
                        // ]}
                        >
                        <Select.Option disabled={isOptionDisabled('Confirming', status)} label='Chờ xác nhận' value='Confirming' >Chờ xác nhận</Select.Option>
                        <Select.Option disabled={isOptionDisabled('Confirmed', status)} label='Đã xác nhận' value='Confirmed' >Đã xác nhận</Select.Option>
                        <Select.Option disabled={isOptionDisabled('Shipping', status)} label='Đang vận chuyển' value='Shipping' >Đang vận chuyển</Select.Option>
                        <Select.Option disabled={isOptionDisabled('Shipped', status)} label='Đã giao xong' value='Shipped' >Đã giao xong</Select.Option>
                        <Select.Option disabled={isOptionDisabled('Cancelled', status)} label='Đã hủy' value='Cancelled' >Đã hủy</Select.Option>
                    </Select>
                    
                </div>
            )
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text: any, record: any, index: any) => <button onClick={(e) => submitAction(record, index)} className='w-[5rem] text-[#1677FF]'>Cập nhật</button>
        },
        
    ]
    
    return (
        <div>
            {user.user.role == 'customer' 
            ? 
                <div>404 not found</div>
            :
                <div className='mt-32 flex'>            
                    <div className="tabs w-40 mt-10">
                        <button onClick={() => setAction('OrderManagement')} className='text-sm'>Quản lý đơn hàng</button>
                        <div>
                            <button onClick={() => setAction('ShowStaff')} className='text-sm'>Quản lý tài khoản</button>
                            <button onClick={() => setAction('AddStaff')} className='text-xs ml-4'>Thêm nhân viên</button>
                            <button onClick={() => setAction('ShowStaff')} className='text-xs ml-4'>Quản lý nhân viên</button>
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-full ">
                        {
                            action === 'OrderManagement' 
                            ? 
                                <Table dataSource={orderShown} columns={columns} ></Table> 
                            : 
                                action === 'AddStaff' 
                                ?
                                    <div className=' w-max '>
                                        <Form form={form} name='addUser' layout='vertical' autoComplete='off' style={{ width: 300 }}>
                                            <Form.Item name="name" label="Tên" rules={[{ required: true }]}>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item name="email" label="Email" rules={[{ required: true }, {type: 'email', message: 'Không đúng định dạng e-mail'}]}>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true }]}>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item name="role" label="Vai trò" rules={[{ required: true }]}>
                                            <Select
                                                options={[
                                                    { value: 'admin', label: 'Quản lí' },
                                                    { value: 'staff', label: 'Nhân viên' },
                                                    { value: 'customer', label: 'Khách hàng' },
                                                ]}
                                            />
                                            </Form.Item>
                                            <Form.Item name="password" label="Mật khẩu" rules={[{ required: true }]}>
                                                <Input.Password allowClear />
                                            </Form.Item>
                                            <Form.Item>
                                                <Space>
                                                <SubmitButton form={form} />
                                                <Button htmlType="reset">Reset</Button>
                                                </Space>
                                            </Form.Item>
                                        </Form>
                                    
                                    </div>
                                :
                                    <Table dataSource={staffs}>
                                        <Column title='ID' dataIndex='id' key='id' />
                                        <Column title='Họ tên' dataIndex='name' key='name' />
                                        <Column title='Số điện thoại' dataIndex='phone' key='phone' />
                                        <Column title='Email' dataIndex='email' key='email' />
                                        <Column title='Chức vụ' dataIndex='role' key='role' />
                                        <Column title='Hành động' 
                                                key='action' 
                                                render={(text: any, record: any) => (
                                                    <Space size='middle' >
                                                        <Button onClick={() => deleteStaff(record)} type='link'>Xóa</Button>
                                                    </Space>
                                                )}
                                            />
                                    </Table> 

                        }
                        {/* <Table dataSource={orderShown} columns={columns} ></Table> */}
                    </div>
            </div>  
            }
        </div>
    )
}

export default Management;