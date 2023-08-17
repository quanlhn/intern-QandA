import React from 'react';
import categoryJSON from './../../public/category.json';
import ClothType from './ClothType';

type Props = {
    gender: string,
}

const ListCate: React.FC<Props> = ({gender}) => {

    const list = () => {
        var tagsShown: { id: string; name: string; gender: string[]; filename: string; }[] = []
        for (var i = 0; i < categoryJSON.category.length; i++) {
            if (tagsShown.length > 7) break;
            if (categoryJSON.category[i].gender.includes(gender)) tagsShown.push({...categoryJSON.category[i], gender: [gender]})
        }
        return tagsShown
    }

    const clothTypeClass = ' items-center py-2 px-2 border-2 border-grey1'

    return (
        <div className='list-cate mt-10'>
            <h1 className='text-orange text-center text-2xl mb-10'>Danh mục nổi bật</h1>
            <div className="clothTypes grid grid-cols-4 gap-4 grid-rows-2 w-5/6 ml-auto mr-auto">
                {list().map((e, i) => {
                    return (
                        <ClothType 
                            url={e.filename} 
                            name={e.name} 
                            gender={e.gender[0]} 
                            flexDirec={clothTypeClass} 
                        />
                    )
                })}

            </div>

        </div>
    )
}

export default ListCate