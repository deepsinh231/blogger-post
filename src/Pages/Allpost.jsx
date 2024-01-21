import React, { useEffect, useState } from 'react'
import servie from '../appwrite/config'
import { PostCrad, Container } from '../Components'

export default function Allpost() {
    const [posts, setposts] = useState([])
    useEffect(() => {
        servie.listDoumnet([]).then((post) => {
            if (post) {
                setposts(post.documents)
            }
        })
    }, [posts])
    return posts.length !== 0 ?
        (<div className='w-full'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div className='p-2 w-1/4' key={post.$id}>
                            <PostCrad post={post} />
                        </div>
                    ))}
                </div>
            </Container >
        </div >)
        : (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Pls Add Post
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
}
