'use client'

import React, { createContext, useState} from "react";
import { Cart, Order } from "./CustomInterface";

type UserType = {
  id : string,
  name: string,
  phoneNumber: string,
  email: string,
  role: string,
  isLoggedIn: boolean,
  cartDrawer: Array<Cart>,
  orders: Array<Order>
}

interface User {
  user: UserType
  setUser : React.Dispatch<React.SetStateAction<UserType>>;
}

const UserContext = createContext({} as User)

export const UserProvider = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
    // const [id, setID] = useState('')
    // const [name, setName] = useState('')
    // const [phoneNumber, setPhoneNumber] = useState('')
    // const [email, setEmail] = useState('')
    // const [isLoggedIn, setIsLoggedIn] = useState(false)
    // const [cartDrawer, setCartDrawer] = useState<Array<Object>>([])

    const [user, setUser] = useState({
      id: '',
      name: '',
      phoneNumber: '',
      email: '',
      role:'',
      isLoggedIn: false,
      cartDrawer: new Array<Cart>(),
      orders: new Array<Order>()
  })
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider> 
    )
}

export default UserContext
