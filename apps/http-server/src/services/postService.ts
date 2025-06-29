import { prismaClient } from "@repo/db-config/client";
import { GraphqlContext, ImageSignedURLPayload, VideoSignedURLPayload } from "./interfaces.js";

import { CreateCommentData, CreatePostPayload } from "../app/post/types.js";
import { redisClient } from "@repo/redis-config/client";
import * as dotenv from "dotenv";
dotenv.config();

class PostService {
  public static async getAllPost() {
    const posts = prismaClient.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        likes: {
          include: {
            user: true,
          },
        },
      },
    });
    return posts;
  }
  public static async createPost(
    payload: CreatePostPayload,
    ctx: GraphqlContext
  ) {
    if (!ctx.user) {
      throw new Error("You must be logged in to create a post");
    }
    console.log("Received payload:", payload);
    const post = await prismaClient.post.create({
      data: {
        content: payload.content,
        imageURL: payload.imageURL,
        videoURL: payload.videoURL,
        author: {
          connect: {
            id: ctx.user.id,
          },
        },
      },
    });
    // await redisClient.del("posts");
    return post;
  }
  public static async getAuthor(post: any) {
    return await prismaClient.user.findUnique({
      where:{
        id:post.authorId
      }
    })
  }
  public static async getLikes(post: any) {
    return await prismaClient.like.findMany({
      where:{
        postId:post.id
      }
    })
  }
  public static async createComment(payload: CreateCommentData, ctx: GraphqlContext) {
    const comment = await prismaClient.comment.create({
      data: {
        content: payload.content,
        imageURL: payload.imageURL,
        author: {
          connect: { id: ctx.user.id },
        },
        post:{
          connect: { id: payload.postid }
        },
      },
    });
    return comment;
  }
  public static async getCommentAuthor(comment:any) {
    return await prismaClient.user.findUnique({
      where:{
        id:comment.authorId
      }
    })
  }
  public static async getCommentReplies(comment:any) {
    return await prismaClient.reply.findMany({
      where:{
        commentId:comment.id
      }
    })
  }
  public static async createReply(payload: any, ctx: GraphqlContext) {
    const reply = await prismaClient.reply.create({
      data: {
        content: payload.content,
        imageURL: payload.imageURL,
        author: {
          connect: { id: ctx.user.id },
        },
        comment:{
          connect: { id: payload.commentId }
        },
      },
    });
    return reply; 
  }
  public static async getComments(post:any) {
    return await prismaClient.comment.findMany({
      where:{
        postId:post.id
      }
    })
  }
  public static async getCommentLikes(comment:any) {
    return await prismaClient.like.findMany({
      where:{
        commentId:comment.id
      }
    })
  }
  public static async getReplyAuthor(reply:any) {
    return await prismaClient.user.findUnique({
      where:{
        id:reply.authorId
      }
    })
  }
  public static async getReplyLikes(reply:any) {
    return await prismaClient.like.findMany({
      where:{
        replyId:reply.id
      }
    })
  }
}
export default PostService;
