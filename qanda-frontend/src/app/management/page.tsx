'use client'

import React, { useEffect, useState } from 'react';
import { BE_API } from '../CustomInterface';
import { Space, Table, Tag } from 'antd';

const Management: React.FC = () => {

    const [orders, setOrders] = useState()
    const [orderShown, setOrderShown] = useState()
    const { Column } = Table;
    


    useEffect(() => {
        fetch(BE_API + 'orders/')
        .then(response => response.json())
        .then(data => {
            const allCarts = []
            data.response.forEach((cart: any, index: any) => {
                const date = new Date(cart.createdAt)
                // console.log(date.getDate() + '/' + date.getMonth() + '/'  + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes())
                allCarts.push({
                    products: cart.products,
                    id: cart._id.slice(cart._id.length - 6, cart._id.length -1),
                    address: cart.address + ', ' + cart.ward + ', ' + cart.district + ', ' + cart.province,
                    total: cart.total,
                    status: cart.status,
                    date: date,
                })
                setOrders(data.response)
                setOrderShown(() => data.response.map((cart: any) => {
                    return {
                        products: cart.products,
                        id: cart._id.slice(cart._id.length - 6, cart._id.length -1),
                        address: cart.address + ', ' + cart.ward + ', ' + cart.district + ', ' + cart.province,
                        total: cart.total,
                        status: cart.status,
                        date: date,
                        userID: cart.userID
                    }
                }))
            })
        })
        console.log(orderShown)
    },[])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (text :any) => <div>{text}</div>
        },
        {
            title: 'User ID',
            dataIndex: 'userID',
            key: 'userID',
            render: (text :any) => <div>{text}</div>
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'products',
            key: 'products',
            render: (products :any) => (
                <div>
                    {products.map((product: any) => (
                        <div>
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
            render: (text :any) => <div>{text}</div>
        },
    ]

    return (
        <div className='mt-32 flex'>
            <div className="tabs w-40">
                <button>Quản lý đơn hàng</button>
                <button>Quản lý tài khoản</button>
            </div>
            <div className="table">
                <Table dataSource={orderShown} columns={columns} ></Table>
            </div>
        </div>
    )
}

export default Management;