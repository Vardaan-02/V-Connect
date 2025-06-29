import { 
 UsersIcon, 
 HeartIcon, 
 MessageCircleIcon, 
 ShareIcon, 
} from 'lucide-react';
import { AnalyticsCard } from './anaylyticsCard';

export const StatsGrid = ({user}) => {
 const getTotalLikes = (posts: any) => {
    console.log(posts);
   return posts.reduce((acc: any, post: any) => {
     return acc + post.likes.length
   }, 0)
 }
 const getTotalComments = (posts: any) => {
   return posts.reduce((acc: any, post: any) => {
     return acc + post.comments
   }
   , 0)
 }
 return (
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
     <AnalyticsCard
       title="Total Followers"
       value={user.followers.length}
       change={4.5}
       icon={UsersIcon}
       delay={0}
     />
     <AnalyticsCard
       title="Total Likes"
       value={getTotalLikes(user.posts)}
       change={8.7}
       icon={HeartIcon}
       delay={300}
     />
     <AnalyticsCard
       title="Comments"
       value={getTotalComments(user.posts)}
       change={15.2}
       icon={MessageCircleIcon}
       delay={400}
     />
     <AnalyticsCard
       title="Shares"
       value={3524}
       change={5.1}
       icon={ShareIcon}
       delay={500}
     />
   </div>
 );
};
