import React, { useEffect, useState } from 'react'
import servie from '../appwrite/config'
import { Container, PostCrad } from '../Components'
import { useSelector } from 'react-redux'

export default function HomePage() {
    const [posts, setposts] = useState([])
    const Loginstatus = useSelector((state) => state.auth.status)
    useEffect(() => {
        servie.listDoumnet([]).then((posts) => {
            if (posts) {
                setposts(posts.documents)
            }
        })
    }, [])
    if (Loginstatus && posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Add Post
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    } else if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full'>
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCrad post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}
