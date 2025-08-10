import PostCard from "./PostCard";

export default function PostList({ posts }) {
  return (
    <div className="posts-grid">
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
}
