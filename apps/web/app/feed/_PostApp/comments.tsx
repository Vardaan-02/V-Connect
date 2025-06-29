"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/ui/avatar"
import { Textarea } from "@ui/components/ui/textarea"
import {
  MessageCircle,
  Share2,
  Send,
  Reply,
  X,
  ThumbsUp,
  AlertTriangle,
  ImageIcon,
  Smile,
  AtSign,
  Calendar,
  Clock,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { PostCard } from "./postcard"
import { Post } from "gql/graphql"
import { graphqlClient } from "@providers/graphqlClient"
import { createCommentMutation, createReplyMutation } from "graphql/mutation/post"
import { useQueryClient } from "@tanstack/react-query"
import { likePostMutation, unlikePostMutation } from "graphql/mutation/user"
import { useIsMobile } from "@hooks/isMobile"
import { convertIsoToHuman } from "@ui/lib/utils"

export default function PostWithComments({ post,delay,user,setShowComments }:{post:Post,delay:number,user:any,setShowComments:any}) {
  const [commentText, setCommentText] = useState("")
  const [replyText, setReplyText] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [showComments, setShowComment] = useState(true)
  const [likedComments, setLikedComments] = useState<string[]>([])
  const [likedReplies, setLikedReplies] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const isMobile = useIsMobile()
  const queryClient = useQueryClient()
  
  const [comments, setComments] = useState(post.comments.map((comment) => {
    const {date,time}=convertIsoToHuman(comment.createdAt);
    
    return ({
    id: comment.id,
    user: {
      name: comment.author.name,
      username:comment.author.title,
      avatar: comment.author.profileImageURL,
    },
    content: comment.content,
    timestamp: `${date} At:${time}`,
    likes: comment.likes.length,
    replies: comment.replies.map((reply) => {
      return ({
      id:reply.id,
      user: {
        name: reply.author.name,
        username: reply.author.title,
        avatar: reply.author.profileImageURL,
      },
      content: reply.content,
      timestamp: reply.createdAt,
      likes: reply.likes.length,
    
    })}),
  })})
  )
  useEffect(() => {
    setLikedComments(post.comments.filter((comment) => comment.likes.some((like) => like.userId === user.id)).map((comment) => comment.id))
    setLikedReplies(post.comments.map(Comment=>{
      return Comment.replies.filter((reply) => reply.likes.some((like) => like.userId === user.id)).map((reply) => reply.id)
    }).flat())
  }, [post, user, setLikedComments, setLikedReplies])
  const handleAddComment = async() => {
    if (commentText.trim()) {
      setIsLoading(true)
      const payload={
        content:commentText,
        postid:post.id,
      }
      await graphqlClient.request(createCommentMutation, { payload });
      await queryClient.invalidateQueries({ queryKey: ["all-posts"] });
      setTimeout(() => {
        setComments((prevComments) => [
          {
            id: prevComments.length.toString(),
            user: {
              name: user.name,
              username: user.title,
              avatar: user.profileImageURL,
            },
            content: commentText,
            timestamp: `${convertIsoToHuman(new Date().toISOString()).date} At:${convertIsoToHuman(new Date().toISOString()).time}`,
            likes: 0,
            replies: [],
          },
          ...prevComments,
        ])
      }, 500)
      setCommentText("")
      setIsLoading(false)
    }
  }

  const handleAddReply = async(commentId: string) => {
    if (replyText.trim()) {
      setIsLoading(true)
      const payload={
        content:replyText,
        commentId:commentId,
      }
      await graphqlClient.request(createReplyMutation,{payload});
      await queryClient.invalidateQueries({queryKey:["all-posts"] });
      setTimeout(() => {
        setComments((prevComments) =>
          prevComments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
          ...comment.replies,
          {
            id: comment.replies.length.toString(),
            user: {
              name: user.name,
              username: user.title,
              avatar: user.profileImageURL,
            },
            content: replyText,
            timestamp: new Date().toString(),
            likes: 0,
          },
            ],
          }
        }
        return comment
          })
        );
        setReplyText("")
        setReplyingTo(null)
        setIsLoading(false)
      }, 500);
    }
  }

  const toggleLike = async(id: string,name:string) => {
    if(name=='comment'){
    if (likedComments.includes(id)) {
      await graphqlClient.request(unlikePostMutation as any,{unlikeId:id,name:"comment"})
      await queryClient.invalidateQueries(["current-user",id]as any)
      setLikedComments(likedComments.filter((id) => id !== id))
      setComments(
        comments.map((comment) => {
          if (comment.id === id) {
            return { ...comment, likes: comment.likes - 1 }
          }
          return comment
        }),
      )
    } else {
      console.log("id",id)
      await graphqlClient.request(likePostMutation as any,{likeId:id,name:"comment"})
      await queryClient.invalidateQueries(["current-user",id]as any)
      setLikedComments([...likedComments, id])
      setComments(
        comments.map((comment) => {
          if (comment.id === id) {
            return { ...comment, likes: comment.likes + 1 }
          }
          return comment
        }),
      )
    }
  }else if(name=='reply'){
    if (likedComments.includes(id)) {
      await graphqlClient.request(unlikePostMutation as any,{unlikeId:id,name:"reply"})
      await queryClient.invalidateQueries(["current-user"]as any)
      setLikedReplies(likedReplies.filter((id) => id !== id))
      setComments(
        comments.map((comment) => {
          return {
            ...comment,
            replies: comment.replies.map((reply) => {
              if (reply.id === id) {
                return { ...reply, likes: reply.likes - 1 }
              }
              return reply
            }),
          }
        }),
      )
    } else {
      await graphqlClient.request(likePostMutation as any,{likeId:id,name:"reply"})
      await queryClient.invalidateQueries(["current-user"]as any)
      setLikedReplies([...likedReplies, id])
      setComments(
        comments.map((comment) => {
          return {
            ...comment,
            replies: comment.replies.map((reply) => {
              if (reply.id === id) {
                return { ...reply, likes: reply.likes + 1 }
              }
              return reply
            }),
          }
        }),
      )
    }
  }
  }
  useEffect(() => {
    setShowComment(true)
  }
  , [post,setShowComments])
  const toggleComments = () => {
    setShowComments(!showComments)
    setShowComment(!showComments)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-transparent overflow-hidden fixed z-50 inset-0">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="absolute inset-0 backdrop-blur-md bg-blue-950/30"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-6xl flex flex-col md:flex-row gap-4 z-10"
      >
        {!isMobile&&
        <PostCard post={post} delay={delay} ></PostCard>
        }
        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="flex-1 md:max-w-md backdrop-blur-xl bg-black/30 rounded-2xl shadow-[0_8px_32px_0_rgba(79,70,229,0.37)] hover:shadow-[0_8px_32px_0_rgba(79,70,229,0.45)] transition-all duration-500 border border-indigo-500/20 max-w-xl w-full overflow-hidden relative group hover:-translate-y-1"
            >
              <div className="flex justify-between items-center p-4 border-b border-indigo-500/20 bg-gradient-to-r from-black/80 to-gray-900/80">
          <h3 className="text-lg font-semibold flex items-center">
            <MessageCircle className="h-5 w-5 mr-2 text-indigo-400" />
            Comments ({comments.reduce((total, comment) => total + 1 + comment.replies.length, 0)})
          </h3>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleComments}
            className="text-indigo-300 hover:text-white p-1 rounded-full hover:bg-indigo-800/50 transition-colors duration-300"
          >
            <X className="h-5 w-5" />
          </motion.button>
              </div>

              <div className="max-h-[70vh] overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-indigo-700 scrollbar-track-black/30">
          <div className="flex gap-3">
            <Avatar className="h-8 w-8 ring-2 ring-indigo-400/30 ring-offset-1 ring-offset-black/60">
              <AvatarImage src={user.profileImageURL} alt="Current User" />
              <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-purple-600">CU</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="relative">
                <Textarea
            placeholder="Add a comment..."
            className="mb-2 bg-black/30 border-indigo-500/20 text-indigo-100 placeholder:text-indigo-400 focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300 backdrop-blur-md"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
                />
                <div className="absolute bottom-4 right-3 flex gap-2 text-indigo-400">
            <button className="hover:text-indigo-300 transition-colors duration-300">
              <Smile className="h-4 w-4" />
            </button>
            <button className="hover:text-indigo-300 transition-colors duration-300">
              <ImageIcon className="h-4 w-4" />
            </button>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAddComment}
                disabled={isLoading}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-4 py-2 rounded-md font-medium flex items-center justify-center transition-all duration-300 disabled:opacity-70 backdrop-blur-md"
              >
                {isLoading ? (
            <div className="h-5 w-5 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Post Comment
            </>
                )}
              </motion.button>
            </div>
          </div>

          {comments.map((comment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <div className="flex gap-3">
                <Avatar className="h-8 w-8 ring-2 ring-indigo-400/30 ring-offset-1 ring-offset-black/60">
            <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
            <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-purple-600">
              {comment.user.name.charAt(0)}
            </AvatarFallback>
                </Avatar>
                <div className="flex-1">
            <motion.div
              whileHover={{ boxShadow: "0 0 15px rgba(79, 70, 229, 0.3)" }}
              className="bg-gradient-to-br from-black/40 to-gray-900/40 p-3 rounded-lg border border-indigo-500/20"
            >
              <div className="flex justify-between mb-1">
                <div>
                  <span className="font-semibold">{comment.user.name}</span>
                  <span className="text-xs text-indigo-300 ml-2">{comment.user.username}</span>
                </div>
                <span className="text-xs text-indigo-300 flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {comment.timestamp}
                </span>
              </div>
              <p className="text-indigo-100">{comment.content}</p>
            </motion.div>
            <div className="flex gap-4 mt-2 text-sm">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleLike(comment.id,'comment')}
                className={`flex items-center gap-1 transition-colors duration-300 ${
                  likedComments.includes(comment.id) ? "text-pink-400" : "text-indigo-300 hover:text-pink-400"
                }`}
              >
                <ThumbsUp className="h-3.5 w-3.5" />
                <span>{comment.likes}</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-indigo-300 hover:text-indigo-100 flex items-center gap-1 transition-colors duration-300"
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              >
                <Reply className="h-3.5 w-3.5" />
                Reply
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-indigo-300 hover:text-indigo-100 flex items-center gap-1 transition-colors duration-300"
              >
                <Share2 className="h-3.5 w-3.5" />
                Share
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-indigo-300 hover:text-red-400 flex items-center gap-1 transition-colors duration-300 ml-auto"
              >
                <AlertTriangle className="h-3.5 w-3.5" />
              </motion.button>
            </div>

            <AnimatePresence>
              {replyingTo === comment.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 flex gap-2 overflow-hidden"
                >
                  <Avatar className="h-6 w-6 ring-1 ring-indigo-400/30 ring-offset-1 ring-offset-black/60">
              <AvatarImage src={user.profileImageURL} alt="Current User" />
              <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-purple-600 text-xs">
                CU
              </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
              <div className="relative">
                <Textarea
                  placeholder={`Reply to ${comment.user.name}...`}
                  className="mb-2 text-sm bg-black/50 border-indigo-500/20 text-indigo-100 placeholder:text-indigo-400 min-h-[60px] focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300 backdrop-blur-md"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <div className="absolute bottom-4 right-3 flex gap-2 text-indigo-400">
                  <button className="hover:text-indigo-300 transition-colors duration-300">
                    <Smile className="h-3 w-3" />
                  </button>
                  <button className="hover:text-indigo-300 transition-colors duration-300">
                    <AtSign className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setReplyingTo(null)}
                  className="border border-indigo-700 text-indigo-300 hover:bg-indigo-800/50 hover:text-white px-3 py-1 rounded-md text-sm transition-colors duration-300"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAddReply(comment.id)}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-3 py-1 rounded-md text-sm flex items-center transition-all duration-300 disabled:opacity-70"
                >
                  {isLoading ? (
                    <div className="h-3 w-3 rounded-full border-2 border-t-transparent border-white animate-spin mx-1"></div>
                  ) : (
                    <>
                <Send className="h-3 w-3 mr-1" />
                Reply
                    </>
                  )}
                </motion.button>
              </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {comment.replies.length > 0 && (
              <div className="ml-6 mt-3 space-y-3 border-l-2 border-gradient-to-b from-indigo-500/50 via-purple-500/30 to-indigo-800/20 pl-3">
                {comment.replies.map((reply, replyIndex) => (
                  <motion.div
              key={replyIndex}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex gap-2"
                  >
              <Avatar className="h-6 w-6 ring-1 ring-indigo-400/30 ring-offset-1 ring-offset-black/60">
                <AvatarImage src={reply.user.avatar} alt={reply.user.name} />
                <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-purple-600 text-xs">
                  {reply.user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <motion.div
                  whileHover={{ boxShadow: "0 0 10px rgba(79, 70, 229, 0.2)" }}
                  className="bg-gradient-to-br from-black/50 to-gray-900/50 p-2 rounded-lg border border-indigo-500/20 backdrop-blur-md"
                >
                  <div className="flex justify-between mb-1">
                    <div>
                <span className="font-semibold text-sm">{reply.user.name}</span>
                <span className="text-xs text-indigo-300 ml-1">{reply.user.username}</span>
                    </div>
                    <span className="text-xs text-indigo-300 flex items-center">
                <Clock className="h-2.5 w-2.5 mr-1" />
                {reply.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-indigo-100">{reply.content}</p>
                </motion.div>
                <div className="flex gap-3 mt-1 text-xs">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleLike(reply.id,'reply')}
                    className={`text-indigo-300 ${likedReplies.includes(reply.id) ? "text-pink-400" : "text-indigo-300"} hover:text-pink-400 flex items-center gap-1 transition-colors duration-300`}
                  >
                    <>
                      <ThumbsUp className="h-3 w-3" />
                      <span>{reply.likes}</span>
                    </>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-indigo-300 hover:text-indigo-100 flex items-center gap-1 transition-colors duration-300"
                  >
                    <Reply className="h-3 w-3" />
                    Reply
                  </motion.button>
                </div>
              </div>
                  </motion.div>
                ))}
              </div>
            )}
                </div>
              </div>
            </motion.div>
          ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

