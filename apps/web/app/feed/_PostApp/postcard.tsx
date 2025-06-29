import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, MoreVertical, Code2, Cpu, Globe2, Sparkles, UserCheck, UserPlus } from 'lucide-react';
import { followUserMutation, likePostMutation, unfollowUserMutation, unlikePostMutation } from 'graphql/mutation/user';
import { graphqlClient } from '@providers/graphqlClient';
import { useQueryClient } from '@tanstack/react-query';
import PostWithComments from './comments';
import { VideoPlayer } from './videoPlayer';
import { convertIsoToHuman } from '@ui/lib/utils';
import { useUser } from '@providers/stateClient/userClient';
export function PostCard({ post,delay }) {
  const {currentUser:user}=useUser();
  const amiLiked = useMemo(() => post.likes.some((liker: { userId: string }) => liker.userId === user.id), [user?.id, post]);
  const isFollowing = useMemo(() => user.following.some((f: { id: string }) => f.id === post.author.id) ?? false, [user, post.author.id]);
  const [isLiked, setIsLiked] = useState(amiLiked);
  const [following, setFollowing] = useState(isFollowing);
  const [likes, setLikes] = useState<number>(post.likes.length);
  const [isHovered, setIsHovered] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const {date,time}=convertIsoToHuman(post.createdAt);
  useEffect(() => setIsLiked(amiLiked), [amiLiked,isLiked]);
  useEffect(() => setFollowing(isFollowing), [isFollowing,following]);
  const queryClient=useQueryClient();
  const handleLikePost=useCallback(async()=>{
    if(!post?.id) return;
    else{
      await graphqlClient.request(likePostMutation as any,{likeId:post.id,name:"post"})
      await queryClient.invalidateQueries(["current-user",post?.id]as any)
      setIsLiked(!isLiked);
      setLikes((prev: number) => (prev + 1));
    }
  },[queryClient,post?.id])
  const handleUnlikePost=useCallback(async()=>{
    if(!post?.id) return;
    else{
      await graphqlClient.request(unlikePostMutation as any,{unlikeId:post.id,name:"post"})
      await queryClient.invalidateQueries(["current-user",post?.id]as any)
      setIsLiked(!isLiked);
      setLikes((prev: number) => ( prev - 1 ));
    }
  },[queryClient,post?.id])
  const handleFollowUser=useCallback(async()=>{
    if(!user.id) return;
    else{
      await graphqlClient.request(followUserMutation as any,{to:post.author.id})
      await queryClient.invalidateQueries(["current-user",user.id]as any)
      setFollowing(!isFollowing);
    }
  },[queryClient,user.id])
  const handleUnfollowUser=useCallback(async()=>{
    if(!user.id) return;
    else{
      await graphqlClient.request(unfollowUserMutation as any,{to:post.author.id})
      await queryClient.invalidateQueries(["current-user",user.id]as any)
      setFollowing(!isFollowing);
    }
  },[queryClient,user.id])
  return (
    <>
    {showComments ? (
       <PostWithComments post={post} user={user} delay={0.25} setShowComments={setShowComments}/>
    ) : (<motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="backdrop-blur-xl bg-black/30 rounded-2xl shadow-[0_8px_32px_0_rgba(79,70,229,0.37)] hover:shadow-[0_8px_32px_0_rgba(79,70,229,0.45)] transition-all duration-500 border border-indigo-500/20 max-w-xl w-full overflow-hidden relative group hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      <div className={`absolute -right-8 -top-8 opacity-10 transition-transform duration-700 ${isHovered ? 'rotate-180' : 'rotate-12'}`}>
        <Code2 className="w-24 h-24 text-indigo-400" />
      </div>
      <div className={`absolute -left-8 -bottom-8 opacity-10 transition-transform duration-700 ${isHovered ? '-rotate-180' : '-rotate-12'}`}>
        <Cpu className="w-24 h-24 text-purple-400" />
      </div>

      <div className="p-4 flex items-center justify-between relative">
        <div className="flex items-center space-x-3">
          <div className="relative group/avatar">
            <img
              src={post.author.profileImageURL}
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500/30 transition-transform duration-300 group-hover/avatar:scale-110"
            />
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-black animate-pulse"></div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-white">{post.author.name}</h3>
              <Globe2 className="w-4 h-4 text-indigo-400 animate-spin-slow" />
            </div>
            <p className="text-sm text-indigo-200/60 flex items-center space-x-1">
              <Sparkles className="w-3 h-3 animate-pulse" />
              <span>{`${date} At:${time}`}</span>
            </p>
          </div>
        </div>
        <div className='flex space-x-2'>
        {post.author.id!==user.id&&<button onClick={following ? handleUnfollowUser : handleFollowUser} className="p-2 bg-indigo-500/10 rounded-full hover:bg-indigo-500/20">
            {following ? <UserCheck className="w-5 h-5 text-indigo-400" /> : <UserPlus className="w-5 h-5 text-indigo-400" />}
          </button>
        }
        <button className="p-2 hover:bg-indigo-500/10 rounded-full transition-all duration-300 hover:rotate-90">
          <MoreVertical className="w-5 h-5 text-indigo-200" />
        </button>
        </div>
      </div>

      <div className="px-4 py-2">
        <p className="text-gray-200 leading-relaxed">{post.content}</p>
      </div>
      {post.imageURL&&<div className="aspect-video w-full relative mt-2 overflow-hidden">
        <img
          src={post.imageURL}
          alt="Post content"
          className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
        }
        {post.videoURL && (
  <div className="w-full relative mt-2 overflow-hidden group rounded-2xl z-10">
    <VideoPlayer videoURL={post.videoURL} />
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
  </div>
)}
      

      <div className="px-4 py-3 flex items-center justify-between border-t border-indigo-500/20 backdrop-blur-sm bg-black/10">
        <span className="text-sm text-indigo-200/60 flex items-center space-x-1">
          <span className="transition-all duration-300">{likes}</span>
          <span>likes</span>
        </span>
        <div className="flex items-center space-x-4 text-sm text-indigo-200/60">
          <span>{post.comments.length} comments</span>
          <span>{0} shares</span>
        </div>
      </div>

      <div className="px-4 py-2 flex items-center justify-around backdrop-blur-sm bg-black/5">
        <button
          onClick={isLiked?handleUnlikePost:handleLikePost}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
            isLiked
              ? 'text-red-400 hover:bg-red-500/10'
              : 'text-indigo-200 hover:bg-indigo-500/10'
          }`}
        >
          <Heart 
            className={`w-5 h-5 transition-transform duration-300 ${isLiked ? 'fill-current scale-110' : ''} ${isHovered ? 'animate-pulse' : ''}`}
          />
          <span>Like</span>
        </button>
        
        <button 
        onClick={()=>setShowComments(!showComments)}
        className="flex items-center space-x-2 px-4 py-2 rounded-full text-indigo-200 hover:bg-indigo-500/10 transition-all duration-300 transform hover:scale-105">
          <MessageCircle className="w-5 h-5" />
          <span>Comment</span>
        </button>

        <button className="flex items-center space-x-2 px-4 py-2 rounded-full text-indigo-200 hover:bg-indigo-500/10 transition-all duration-300 transform hover:scale-105">
          <Share2 className="w-5 h-5" />
          <span>Share</span>
        </button>
    </div>
    </motion.div>)}
    </>
  );
}
