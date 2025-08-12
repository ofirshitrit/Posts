
export default function Comment({comment, index}) {
  return (
    <div className='comment'>
      <div className='email-id-container'>
        <h6 class="comment-email">{comment.email}</h6>
         <span className="comment-index">#{index}</span>
      </div>
      <p class="comment-body">{comment.body}</p>
    </div>
  )
}
