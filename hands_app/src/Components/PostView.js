import React , {useState} from 'react'
import PostThumbnail from './PostThumbnail'
const PostView = () => {
    const [numOfPosts, setNumOfPosts] = useState(9);
    return (
        <div>
        {Array.from(Array(numOfPosts)).map((x, index) =>   
            <PostThumbnail key={index}/>
        )}
        </div>
    )
}

export default PostView
