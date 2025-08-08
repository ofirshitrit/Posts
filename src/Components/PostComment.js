import React from 'react'

export default function PostComment({comment, index}) {
  return (
    <div className='comment'>
      <div className='email-id-container'>
         <span className="comment-index">#{index}</span>
        <h6 class="comment-email">{comment.email}</h6>
      </div>
      <p class="comment-body">{comment.body}</p>
    </div>
  )
}
