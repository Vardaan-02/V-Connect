// import { createContext,useContext,useState } from "react";



// interface PostContextType{
//  posts:Post[];
//  createPost:(post:Post)=>void;
//  deletePost:(postId:string)=>void;
//  createComment:(postId:string,comment:Comment)=>void;
//  deleteComment:(postId:string,commentId:string)=>void;
//  likePost:(postId:string)=>void;
//  unlikePost:(postId:string)=>void;
//  createReply:(postId:string,commentId:string,reply:Reply)=>void;
//  deleteReply:(postId:string,commentId:string,replyId:string)=>void;
// }
// const PostContext = createContext({
//   posts: [],
//   createPost: (post) => {},
//   deletePost: (postId) => {},
//   createComment: (postId, comment) => {},
//   deleteComment: (postId, commentId) => {},
//   likePost: (postId) => {},
//   unlikePost: (postId) => {},
//   createReply: (postId, commentId, reply) => {},
//   deleteReply: (postId, commentId, replyId) => {},
// });

// export const PostProvider = ({ children }: { children: React.ReactNode }) => {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [currentPost,setCurrentPost] =useState<Post|null>(null);
//   const [currentComment,setCurrentComment] =useState<Comment|null>(null);

//   const createPost = (post: Post) => {
//     setPosts((prevPosts) => [...prevPosts, post]);
//   };

//   const deletePost = (postId: string) => {
//     setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
//   };

//   const createComment = (postId: string, comment: Comment) => {
//     setPosts((prevPosts) =>
//       prevPosts.map((post) =>
//         post.id === postId ? { ...post, comments: [...post.comments, comment] } : post
//       )
//     );
//   };
//   const deleteComment = (postId: string, commentId: string) => {
//     setPosts((prevPosts) =>
//       prevPosts.map((post) =>
//         post.id === postId
//           ? { ...post, comments: post.comments.filter((comment) => comment.id !== commentId) }
//           : post
//       )
//     );
//   };
//   const likePost = (postId: string) => {
//     setPosts((prevPosts) =>
//       prevPosts.map((post) =>
//         post.id === postId ? { ...post, likes: [...post.likes, { id: "currentUserId" }] } : post
//       )
//     );
//   };
//   const unlikePost = (postId: string) => {
//     setPosts((prevPosts) =>
//       prevPosts.map((post) =>
//         post.id === postId
//           ? { ...post, likes: post.likes.filter((like) => like.id !== "currentUserId") }
//           : post
//       )
//     );
//   };
//   const createReply = (postId: string, commentId: string, reply: Reply) => {
//     setPosts((prevPosts) =>
//       prevPosts.map((post) =>
//         post.id === postId
//           ? {
//               ...post,
//               comments: post.comments.map((comment) =>
//                 comment.id === commentId ? { ...comment, replies: [...comment.replies, reply] } : comment
//               ),
//             }
//           : post
//       )
//     );
//   };
//   const deleteReply = (postId: string, commentId: string, replyId: string) => {
//     setPosts((prevPosts) =>
//       prevPosts.map((post) =>
//         post.id === postId
//           ? {
//               ...post,
//               comments: post.comments.map((comment) =>
//                 comment.id === commentId
//                   ? { ...comment, replies: comment.replies.filter((reply) => reply.id !== replyId) }
//                   : comment
//               ),
//             }
//           : post
//       )
//     );
//   };
//   return (
//     <PostContext.Provider
//       value={{
//         posts,
//         createPost,
//         deletePost,
//         createComment,
//         deleteComment,
//         likePost,
//         unlikePost,
//         createReply,
//         deleteReply,
//       }}
//     >
//       {children}
//     </PostContext.Provider>
//   );
// }

// export const usePost = () => useContext(PostContext);
