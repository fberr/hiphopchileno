import React from 'react'

export default function Posts({ postsToRender }) {
  return (
    <ul style={{color: "white"}}>
        {postsToRender.map((post, index) => (
        <li key={index}>
            <strong>{post.id}</strong>
            &nbsp;{post.title}
        </li>
        ))}
    </ul>
    
  )
}
