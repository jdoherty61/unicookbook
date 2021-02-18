// import { get } from 'mongoose';
import React, { useEffect, useState } from 'react'
import { getPostByID } from '../../actions/posts';
import  defaultImg from '../../images/logo.png';

const innitialRecipeState = {
    image: defaultImg
};

///MIGHT DO THIS WITH THE POSTS...

export const Post = ({ match }) => {
    const [post, setPost] = useState(innitialRecipeState)
    const [loading, isLoading] = useState(false);

    const id = match.params.id;

    useEffect(() => {
        console.log(id);
        getPostByID(id)
        .then(post => {
            post !== undefined && setPost(post);
            console.log(post);
            // setPost(post)
        });
    }, []);


    return (
        <>
         <div>
            Add to shopping list 
        </div>
        <div>
            Card info 
            <img alt={'recipeImage'} src={`../../../../${post.image}`} style={{ height: 100, width: 100 }} />
        </div>

        <div>
            Recipe Info like ingredients 
        </div>
        </>
    )
};

export default Post;
