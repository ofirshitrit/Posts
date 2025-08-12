
export const fetchPosts = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }
    return res.json();
  };

export const fetchPost = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
   if (res.status === 404) {
    throw new Error("Post not found");
  }
  if (!res.ok) {
    throw new Error(`Failed to fetch post with id ${id}`);
  }
  return res.json();
};

export const fetchComments = async (postId) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
   if (res.status === 404) {
    throw new Error("Comments not found");
  }
  if (!res.ok) {
    throw new Error(`Failed to fetch comments to post with id ${postId}`);
  }
  return res.json();
};