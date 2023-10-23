import React from 'react'
import servie from '../../appwrite/config'
import { Link } from 'react-router-dom'


export default function PostCrad({
    $id, title, Img_data
}) {
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100  rounded-xl  p-4">
                <div className="w-full justify-center mb-4">
                    <img src={servie.getfileProview(Img_data)} className='rounded-xl' alt={title} />
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}
