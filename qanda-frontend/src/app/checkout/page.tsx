'use client'

import React, { useEffect, useState, useRef } from 'react';
import {
    Form,
    Input,
    Select,
  } from 'antd';
  import { BE_DIVISION } from '../CustomInterface';


const Checkout: React.FC = () => {
    const [provinces, setProvinces] = useState<Array<any>>([])
    const [districts, setDistricts] = useState<Array<any>>([])
    const [disableDistrict, setDisableDistrict] = useState(true)
    const [wards, setWards] = useState<Array<any>>([])
    const [disableWard, setDisableWard] = useState(true)
    const [provinceAddress, setProvinceAddress] = useState('')
    const [districtAddress, setDistrictAddress] = useState('')
    const [WardAddress, setWardAddress] = useState('')

    useEffect(() => {
        fetch(BE_DIVISION + 'findProvince')
            .then((response => response.json()))
            .then((data) => {
                const p = new Array<any>
                data.response.forEach((e: any) => p.push(e.province))
                setProvinces(p)
            })
    },[])

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
        <div className='mt-32'>
            <div className='text-4xl font-sans font-bold'>Q&A Fashion</div>
            <div className="form">
                <Form
                    labelCol={{
                    span: 4,
                    }}
                    wrapperCol={{
                    span: 14,
                    }}
                    layout="horizontal"
                    
                    style={{
                    maxWidth: 600,
                    }}
                >
                    
                    <Form.Item label="Họ và tên">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Số điện thoại">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Tỉnh thành">
                        <Select onChange={(e) => changeProvince(e)} 
                                filterOption={filterOption} 
                                optionFilterProp="children" 
                                showSearch >
                                    {provinces.map((province, i) => {
                                        return <Select.Option key={i} label={province} value={province}>{province}</Select.Option>
                                    })}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Quận huyện">
                        <Select onChange={(e) => changeDistrict(e)} 
                                disabled={disableDistrict} 
                                filterOption={filterOption} 
                                optionFilterProp="children" 
                                showSearch>
                                    {districts.map((district, i) => {
                                        return <Select.Option key={i} value={district}>{district}</Select.Option>
                                    })}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Phường xã">
                        <Select disabled={disableWard} 
                                filterOption={filterOption} 
                                optionFilterProp="children" 
                                showSearch>
                                    {wards.map((ward, i) => {
                                        return <Select.Option key={i} value={ward}>{ward}</Select.Option>
                                    })}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Địa chỉ">
                        <Input />
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Checkout