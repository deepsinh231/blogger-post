import React, { useEffect, useState } from 'react'
import { PostForm, Container } from '../Components'
import { useNavigate, useParams } from 'react-router-dom'
import servie from '../appwrite/config'


export default function Editpost() {
    const [post, setposts] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (slug) {
            servie.getDocument(slug).then((post) => {
                if (post) {
                    setposts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    )
        :
        null
}
