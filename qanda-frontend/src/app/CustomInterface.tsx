export const BE_PATH =  'http://localhost:8080/'
export const BE_API =  'http://localhost:8080/api/'
export const BE_DIVISION =  'http://localhost:8080/api/division/'
export const BE_PRODUCT_PATH =  'http://localhost:8080/api/product'
export const BE_LOGIN_PATH =  'http://localhost:8080/api/login'
export const BE_REGISTER_PATH =  'http://localhost:8080/api/register'
export const BE_SUGGEST_PATH =  'http://localhost:8080/api/suggestions'
export interface Product {
    _id: any,
    name: string,
    salePrice: number,
    ListedPrice: number,
    percentSale: number,
    color_objects: Array<Color_objects>,
    size: Array<string>,
    gender: string,
    category: string,
    type: string,
    sold: number,
    createdAt: string,
}

export interface Suggestion {
    name: string,
    title: string,
    description: string,
    thumbnail: string,
    filterBy: string,
    sortBy: string,
    getDataBy: string,

}

export interface Color_objects {
    color: string,
    picture: Array<string>
}

export type Cart = {
    id: string,
    name: string | undefined,
    price: number | undefined, 
    size: string,
    color: string,
    picture: string,
    amount: number
}

export type Order = {
    userID: string,
    // id: string,
    products: Array<Cart>,
    total: number,
    ship: number,
    customerName: string,
    phone: string,
    province: string,
    district: string,
    ward: string,
    address: string,
    status: string
}

export function convertType(type: string)  {
    switch (type) {
        case "male":
            return "Nam"
        case 'female':
            return 'Nữ'
        case 'child':
            return 'Trẻ em'
        case 'ao':
            return 'Áo'
        case 'quan':
            return 'Quần'
        case 'ao-polo':
            return 'Áo Polo'
        case 'ao-thun':
            return 'Áo thun'
        case 'ao-somi':
            return 'Áo sơ mi'
        case 'ao-khoac':
            return 'Áo khoác'
        case 'quan-dui':
            return 'Quần đùi'
        case 'quan-kaki':
            return 'Quần kaki'
        case 'quan-bo':
            return 'Quần bò'
        case 'quan-au': 
            return 'Quần âu'
        case 'do-bo': 
            return 'Đồ bộ'
        case 'do-lot': 
            return 'Đồ lót'
        case 'phu-kien': 
            return 'Phụ kiện'
        case 'vay-dam': 
            return 'Váy đầm'
        case 'chan-vay': 
            return 'Chân váy'
        case 'quan-dai': 
            return 'Quần dài'
        default: return 'No data'        
    }
}


