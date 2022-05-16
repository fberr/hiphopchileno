import React from 'react';
import Video from './Video';

export default function VideoList({post}) {
  return (
   <>
      {post && post.map((post) => 
        <Video key={post.id} {...post} /> )
      }
    </>
   
  )
}
