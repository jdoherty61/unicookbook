import React, { useState } from "react";
import PropTypes from "prop-types";
import { addPost } from "../../actions/posts";

const PostForm = (props) => {
  const [post, setPost] = useState({
title: 'New Chicken Recipe',
instructions: 'cook',
effortTime: 12,
totalPrice: 12,
chosenDifficulty: 'EASY',
meal: 'DINNER',
image: 'default.png'
  });



  return (
    <div class="post-form">
      <div class="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      {/* help with this
      https://stackoverflow.com/questions/41878838/how-do-i-set-multipart-in-axios-with-react
      https://stackoverflow.com/questions/60635762/fixing-error-cannot-read-property-path-of-undefined
      https://stackoverflow.com/questions/52798723/append-created-image-file-in-formdata/52801256
      
       */}
      <form class="form my-1" onSubmit={e => {
          e.preventDefault();
          const formData = new FormData();
          formData.append('image', post.image);
          formData.append('title', post.title);
          formData.append('instructions', post.instructions);
          formData.append('effortTime', post.effortTime);
          formData.append('totalPrice', post.totalPrice);
          formData.append('chosenDifficulty', post.chosenDifficulty);
          formData.append('meal', post.meal);
          addPost(formData);
          setPost({})
      }}>
        <textarea
          name="text"
          cols="30"
          rows="1"
          placeholder="Title"
          required
        ></textarea>
        <input type="file" onChange={e => setPost({...post, image: e.target.files[0] })} />
        <input type="submit" class="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

PostForm.propTypes = {};

export default PostForm;
