import React from 'react'

export default function PostComment({comment}) {
  return (
    <div className='comment'>
      <h6>Written by: {comment.email}</h6>
      <p>{comment.body}</p>
    </div>
  )
}
