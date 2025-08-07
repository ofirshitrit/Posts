import React from "react";
import PostCard from "./PostCard";

export default function PostList({ posts }) {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard key={post.id} title={post.title} body={post.body} />
      ))}
    </div>
  );
}
