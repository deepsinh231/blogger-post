import React from 'react'
import servie from '../../appwrite/config'
import { Link } from 'react-router-dom'


export default function PostCrad(
    { post }
) {
    const img = post["Img_data"]
    const title = post["title"]
    return (
        <Link to={`/post/${post["$id"]}`}>
            <div className="w-full bg-gray-100  rounded-xl  p-4">
                <div className="w-full justify-center mb-4">
                    <img src={servie.getfileProview(img)} className='rounded-xl' alt={title} />
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}
