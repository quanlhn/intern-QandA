'use client'

import React, { useEffect, useState, useContext, useRef } from "react";
import UserContext from "../UserContext";
import { Cart, BE_DIVISION, BE_API } from "../CustomInterface";
import { Progress, Modal, Form, Select, Input, Button, Checkbox } from "antd";
import { v4 as uuidv4 } from 'uuid';

const Cart: React.FC = () => {
    const userContext = useContext(UserContext)
    const checkAllBoxRef = useRef<HTMLInputElement>(null)
    const checkboxRef = useRef<(HTMLInputElement)[]>([])
    const [totalPay, setTotalPay] = useState(0)
    const [cartsChosen, setCartsChosen] = useState<Array<Cart>>([])
    const [openModal, setOpenModal] = useState(false)

    const [provinces, setProvinces] = useState<Array<any>>([])
    const [districts, setDistricts] = useState<Array<any>>([])
    const [disableDistrict, setDisableDistrict] = useState(true)
    const [wards, setWards] = useState<Array<any>>([])
    const [disableWard, setDisableWard] = useState(true)
    const [provinceAddress, setProvinceAddress] = useState('')
    const [districtAddress, setDistrictAddress] = useState('')
    const [WardAddress, setWardAddress] = useState('')

    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [totalAmount, setTotalAmount] = useState(0)
    
    const getAmountProducs = () => {
        let amount = 0
        if (window.localStorage) {
            const localUser = JSON.parse(localStorage.user)
            console.log(localUser)
            localUser.cartDrawer.forEach((c: any) => {
                amount += c.amount
            })        
        }
        return amount
    }
    
    const [numberOfProducts, setNumberOfProducts] = useState(getAmountProducs())

    // const amountInCart = () => {
    //     let amount = 0
    //     cartsChosen.forEach(c => {amount += c.amount})
    //     return amount
    // }

    const showModal = () => {
        fetch(BE_DIVISION + 'findProvince')
            .then((response => response.json()))
            .then((data) => {
                const p = new Array<any>
                data.response.forEach((e: any) => p.push(e.province))
                setProvinces(p)
            })
        var amounts = 0
        cartsChosen.forEach(c => amounts += c.amount)
        setTotalAmount(amounts)
        setOpenModal(true)


    }
    const hideModal = () => {
        setOpenModal(false)
    }
    const submitCheckout = () => {
        console.log(form.getFieldsValue())
        
        const order = {
            userID: userContext.user.id,
            // id: uuidv4(),
            products: cartsChosen,
            total: totalPay,
            ship: totalPay < 499000 ? 20000 : 0,
            customerName: form.getFieldValue('name'),
            phone: form.getFieldValue('phone'),
            province: form.getFieldValue('province'),
            district: form.getFieldValue('district'),
            ward: form.getFieldValue('ward'),
            address: form.getFieldValue('address'),
            status: 'Confirming'
        }
        console.log(order)
        fetch(BE_API + 'orders/store', {
            method: 'POST',
            mode: 'cors', 
            headers: {
                'Content-Type': 'application/json'
                
            },
            body: JSON.stringify({
                userID: userContext.user.id,
                order
            })
        })

        var newCartDrawer = new Array<Cart>()
        userContext.user.cartDrawer.forEach((cart, index) => {
            if (!cartsChosen.includes(cart)) {
                newCartDrawer.push(cart)
            } else {
                checkboxRef.current[index].checked = false
            }
        })
        
        let newOrders = userContext.user.orders ? userContext.user.orders : []
        newOrders.push(order)
        const newUserData = {
            ...userContext.user,
            orders: newOrders,
            cartDrawer: newCartDrawer
        }

        userContext.setUser(newUserData)
        if (window !== undefined) {
            localStorage.setItem('user', JSON.stringify(newUserData))
        }
        setTotalPay(0)
        setCartsChosen([])
        setNumberOfProducts(getAmountProducs())

        setLoading(true)

        fetch(BE_API + 'user/updateUser', {
            method: 'POST',
            mode: 'cors', 
            headers: {
                'Content-Type': 'application/json'
                
            },
            body: JSON.stringify({
                userID: userContext.user.id,
                cartDrawer: newCartDrawer
            })
        })
        

        setTimeout(() => {
            setLoading(false)
            setOpenModal(false)
        }, 3000)   
    }

    // useEffect(() => {
        
    // }, [])

    const selectAllCheckBok = (e: any) => {
        
        if (e.checked) {
            checkboxRef.current.forEach((checkbox) => {
                if (checkbox) {
                    checkbox.checked = true   
                }
            });
            setCartsChosen(userContext.user.cartDrawer)
            var sum = 0
            userContext.user.cartDrawer.forEach((cart) => {
                sum += cart.price ? cart.price * cart.amount : 0
            })
            setTotalPay(sum)
        } else {
            checkboxRef.current.forEach(checkbox => {
                if (checkbox) {
                    checkbox.checked = false                
                }
            });
            setCartsChosen([])
            setTotalPay(0)
        }
    }

    const handleCheckBox = (index: any) => {
        if (checkAllBoxRef.current) {
            checkAllBoxRef.current.checked = false
        }
        const currentCart = userContext.user.cartDrawer[index]
        const payment = currentCart.price ? currentCart.price * currentCart.amount : 0
        if(checkboxRef.current[index]?.checked) {
            setCartsChosen([...cartsChosen, currentCart])
            setTotalPay(() => totalPay + payment)
            

        } else {
            setCartsChosen(() => {
                const t_cart = new Array
                cartsChosen.forEach(c => {
                    if (c !== currentCart) {
                        t_cart.push(c)
                    }
                })
                return t_cart
            })
            setTotalPay(() => totalPay - payment)
        }
        
    }

    const changeProvince = (e: any) => {
        setProvinceAddress(e)
        setDisableDistrict(false)
        fetch(BE_DIVISION + 'findDistrict', {
            method: 'POST',
            mode: 'cors', 
            headers: {
                'Content-Type': 'application/json'
                
            },
            body: JSON.stringify({
                province: e
            })
        }) 
            .then((response) => response.json())
            .then((data) => {
                const d = new Array<any>
                data.response.forEach((el: any) => d.push(el.district))
                setDistricts(d)
            })
    }
    const changeDistrict = (e: any) => {
        setDistrictAddress(e)
        setDisableWard(false)
        fetch(BE_DIVISION + 'findWard', {
            method: 'POST',
            mode: 'cors', 
            headers: {
                'Content-Type': 'application/json'
                
            },
            body: JSON.stringify({
                district: e
            })
        }) 
            .then((response) => response.json())
            .then((data) => {
                const w = new Array<any>
                data.response.forEach((el: any) => w.push(el.ward))
                setWards(w)
            })
    }

    const filterOption = (input: any, option: any) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    const onChange = (value: any) => {
        console.log(`selected ${value}`);
    };
    const onSearch = (value: any) => {
        console.log('search:', value);
    };


        





    return (
        <div className="min-h-screen px-10 bg-grey2/20">
            <br/>
            <div className="main flex flex-row mt-20">
                <div className="carts py-4 mr-8 font-roboto bg-white max-w-5xl  rounded-lg">
                    <div className="name ml-10 text-xl"><strong className="mr-12">GIỎ HÀNG</strong><span>({numberOfProducts}) Sản phẩm</span></div>
                    <table className="table-fixed mt-5">
                        <thead>
                            <tr className="h-14 ">
                                <th className=" "><input ref={checkAllBoxRef} type="checkbox" value='all' className="w-4 h-4" onChange={(e) => selectAllCheckBok(e.currentTarget)}/></th>
                                <th className="">Sản phẩm</th>
                                <th className="">Đơn giá</th>
                                <th className="">Số lượng</th>
                                <th className="">Tổng tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userContext.user.cartDrawer.map((cart, index) => {
                                return (
                                    <tr className="h-44" key={index}>
                                        <td className="">
                                            <input type="checkbox" 
                                                    value={cart.id} 
                                                    ref={(el: HTMLInputElement) => checkboxRef.current[index] = el} 
                                                    onChange={() => handleCheckBox(index)} 
                                                    className="w-4 h-4"/></td>
                                        <td className="flex">
                                            <img className="picture h-36 pr-10" src={cart.picture}/>
                                            <div className="detail flex flex-col justify-between">
                                                <div className="name">{cart.name}</div>
                                                <div className="color-size text-sm">{cart.color} / {cart.size}</div>
                                            </div>
                                        </td>
                                        <td><strong>{cart.price?.toLocaleString("de-DE")}đ</strong></td>
                                        <td>{cart.amount}</td>
                                        <td><strong>{(cart.price ? cart.price * cart.amount : 0).toLocaleString("de-DE")}đ</strong></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="total bg-white w-96 h-64 font-roboto rounded-md">
                    <div className="flex justify-between items-center px-10 pt-8">
                        <div className="">Tổng đơn: <strong>{totalPay.toLocaleString("de-DE")}đ</strong></div>
                        <button className="font-bold rounded-md text-white 
                                        bg-orange2 px-4 py-2 
                                        hover:bg-orange2/80 
                                        active:bg-orange2/90 active:drop-shadow-md"
                                onClick={showModal}
                        >
                            Thanh toán
                        </button>
                    </div>
                    <div className="ship-payment px-4 pt-10">
                        <Progress percent={totalPay < 499000 ? totalPay / 499000 * 100 : 100} showInfo={false} />
                        {totalPay >= 499000 
                        ?
                            <div className="">
                                Đơn hàng đủ điều kiện để được giao hàng <span className="text-lightgreen">miễn phí</span>, hãy thanh toán ngay!
                            </div>
                        :
                            <div>
                                <div className="text-lightgreen text-xl">Miễn phí đơn vận chuyển từ 499k</div>
                                <div className="text-sm">Chỉ cần mua thêm {499000 - totalPay} để nhận ưu đãi giao hàng miễn phí</div>
                            </div>
                        }
                    </div>
                </div>

                <Modal  title="Thanh toán" 
                        open={openModal} 
                        onOk={hideModal} 
                        onCancel={hideModal} 
                        centered 
                        width={1000}
                        bodyStyle={{ display: "flex" }}
                        footer={[
                            <Button key='back' onClick={hideModal} >
                                Return
                            </Button>,
                            <Button key='pay' onClick={submitCheckout}  loading={loading} >
                                Thanh toán
                            </Button>,
                        ]}
                >
                    <Form
                        form={form}
                        labelCol={{
                        span: 5,
                        }}
                        wrapperCol={{
                        span: 14,
                        }}
                        layout="horizontal"
                        
                        style={{
                        width: "500px",
                        
                        }}
                        
                    >
                        
                        <Form.Item name='name' label="Họ và tên">
                            <Input defaultValue={userContext.user.name} />
                        </Form.Item>

                        <Form.Item name='phone' label="Số điện thoại">
                            <Input defaultValue={userContext.user.phoneNumber} />
                        </Form.Item>

                        <Form.Item name='province' label="Tỉnh thành">
                            <Select onChange={(e) => changeProvince(e)} 
                                    filterOption={filterOption} 
                                    optionFilterProp="label" 
                                    showSearch >
                                        {provinces.map((province, i) => {
                                            return <Select.Option key={i} label={province} value={province}>{province}</Select.Option>
                                        })}
                            </Select>
                        </Form.Item>
                        <Form.Item name='district' label="Quận huyện">
                            <Select onChange={(e) => changeDistrict(e)} 
                                    disabled={disableDistrict} 
                                    filterOption={(input: any, option: any) =>  
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 
                                        || option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                      }
                                    // optionFilterProp=
                                    showSearch >
                                        {districts.map((district, i) => {
                                            return <Select.Option key={i} lable={district} value={district}>{district}</Select.Option>
                                        })}
                            </Select>
                        </Form.Item>
                        <Form.Item name='ward' label="Phường xã">
                            <Select disabled={disableWard} 
                                    filterOption={(input: any, option: any) =>  
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 
                                        || option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                      }
                                    // optionFilterProp="children" 
                                    showSearch>
                                        {wards.map((ward, i) => {
                                            return <Select.Option key={i} value={ward}>{ward}</Select.Option>
                                        })}
                            </Select>
                        </Form.Item>

                        <Form.Item name='address' label="Địa chỉ cụ thể">
                            <Input />
                        </Form.Item>
                    </Form>
                    <div className="test text-xl w-[500px]">
                        <div className="shipping mt-4">
                            <div className="">Vận chuyển</div>
                            <Checkbox checked>Phí vận chuyển: {totalPay < 499000 ? '20.000đ' : 'Miễn phí'}</Checkbox>
                        </div>
                        <div className="bill">
                            <div>Đơn hàng ({totalAmount} sản phẩm )</div>
                            {cartsChosen.map((cart, index) => {
                                return (
                                    <div className="text-sm flex justify-between mt-4">
                                        <div className="info">
                                            <div><strong>{cart.amount}</strong> {cart.name}</div>
                                            <div>{cart.size} / {cart.color}</div>
                                        </div>
                                        <div className="price mr-10 font-bold">{cart.price ? (cart.price * cart.amount).toLocaleString("de-DE") : 0}</div>
                                    </div>
                                )
                            })}
                            <br/><hr/>
                            <div className="flex pt-4 justify-between">
                                <div>Tổng</div>
                                <div className="sum text-sm mr-10 flex ">
                                    <div className="text">
                                        <div className="text-right">Đơn hàng: </div>
                                        <div className="text-right">Phí vận chuyển: </div>
                                        <div className="text-right">Tổng: </div>
                                    </div>
                                    <div className="cal ml-4 text-right">
                                        <div className="productPrice">{totalPay.toLocaleString("de-DE")}đ</div>
                                        <div className="shipPrice">{(totalPay < 499000 ? 20000 : 0).toLocaleString("de-DE")}đ</div>
                                        <hr />
                                        <div className="total">{(totalPay + (totalPay < 499000 ? 20000 : 0)).toLocaleString("de-DE")}đ</div>
                                    </div>
                                    {/* <div className="text-right">Đơn hàng: &emsp; {totalPay.toLocaleString("de-DE")}đ</div>
                                    <div className="text-right">Phí vận chuyển:  &emsp; {(totalPay < 499000 ? 20000 : 0).toLocaleString("de-DE")}đ</div>
                                    <hr/>
                                    <div className="text-right">{(totalPay + (totalPay < 499000 ? 20000 : 0)).toLocaleString("de-DE")}đ</div> */}
                                </div>
                            </div>
                        </div>
                        
                        <div className="payment mt-4">
                            <div>Phương thức thanh toán</div>
                            <Checkbox checked>Thanh toán khi nhận hàng (COD)</Checkbox>
                        </div>
                    </div>
                </Modal>

            </div>
        </div>
    )
}

export default Cart