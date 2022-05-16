import React, { useState, useEffect } from 'react';
import Posts from "./Posts";
import posts from "./postsArray";

const postsPerPage = 3;
let arrayForHoldingPosts = [];

export default function Example() {
    const [postsToShow, setPostsToShow] = useState([]);
  const [next, setNext] = useState(3);

  const loopWithSlice = (start, end) => {
    const slicedPosts = posts.slice(start, end);
    arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
    setPostsToShow(arrayForHoldingPosts);


    console.log(arrayForHoldingPosts)
  };

  

  useEffect(() => {
    loopWithSlice(0, postsPerPage);
  }, []);

  const handleShowMorePosts = () => {
    loopWithSlice(next, next + postsPerPage);
    setNext(next + postsPerPage);
  };

  return (
    <>
        <Posts postsToRender={postsToShow} />
        <button onClick={handleShowMorePosts}>Load more</button>
    </>
    
  )
}
