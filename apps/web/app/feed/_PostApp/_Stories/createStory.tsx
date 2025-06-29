import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, Camera, XCircle, Loader2, Video } from 'lucide-react';
import { Button } from '@ui/components/ui/button';
import { Input } from '@ui/components/ui/input';
import { Form } from '@ui/components/ui/form';
import { DialogClose } from '@ui/components/ui/dialog';
import { stories } from '@ui/lib/mockdata';
import { graphqlClient } from '@providers/graphqlClient';
import { CreateStoryMutation, CreateStoryMutationVariables, GetSignedUrlForImageQuery, GetSignedUrlForImageQueryVariables, GetSignedUrlForVideoQuery, GetSignedUrlForVideoQueryVariables } from 'gql/graphql';
import { getSignedUrlForImageQuery, getSignedUrlForVideoQuery } from 'graphql/query/post';
import axios from 'axios';
import { createStory } from 'graphql/mutation/story';
import { QueryClient } from '@tanstack/react-query';

interface FormValues {
 mediaUrl: string;
 mediaType: 'image' | 'video';
}

const CreateStoryForm: React.FC = () => {
 const [mediaPreview, setMediaPreview] = useState<string | null>(null);
 const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [imageurl, setImageurl] = useState("");
 const [videoUrl, setVideoUrl] = useState("");
 const fileInputRef = React.useRef<HTMLInputElement>(null);
 const queryClient = new QueryClient();
 const form = useForm<FormValues>({
  defaultValues: {
   mediaUrl: '',
   mediaType: 'image',
  },
 });

 const handleFileChange =async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
   const mediaType = file.type.startsWith('video') ? 'video' : 'image';
   const reader = new FileReader();
   reader.onloadend = () => {
    setMediaPreview(reader.result as string);
    form.setValue('mediaUrl', reader.result as string);
    form.setValue('mediaType', mediaType);
    setMediaType(mediaType);
   };
   reader.readAsDataURL(file);
   if(mediaType === 'video') {
    const response = await graphqlClient.request<GetSignedUrlForVideoQuery,GetSignedUrlForVideoQueryVariables>(
     getSignedUrlForVideoQuery,
     {
       videoName: file.name,
       videoType: file.type,
     }
   );
   const { getSignedUrlForVideo } = response;
   if(getSignedUrlForVideo){
     await axios.put(getSignedUrlForVideo, file, {
       headers: {
         "Content-Type": file.type,
       },
     });
     const url = new URL(getSignedUrlForVideo);
     const filepath = `${url.origin}${url.pathname}`;
     setVideoUrl(filepath);
     console.log(filepath);
   }
  }else{
   const response = await graphqlClient.request<GetSignedUrlForImageQuery,GetSignedUrlForImageQueryVariables>(
    getSignedUrlForImageQuery,
    {
      imageName: file.name,
      imageType: file.type,
    }
  );
  const { getSignedUrlForImage } = response;

  if (getSignedUrlForImage) {
    await axios.put(getSignedUrlForImage, file, {
      headers: {
        "Content-Type": file.type,
      },
    });
    const url = new URL(getSignedUrlForImage);
    const filepath = `${url.origin}${url.pathname}`;
    setImageurl(filepath);
    console.log(filepath);
  }   
  }
 }
 };

 const onSubmit = async (data: FormValues) => {
  setIsSubmitting(true);
  try {
   if (stories.length > 0) {
    const newStory = {
     id: Date.now().toString(),
     mediaUrl: data.mediaUrl,
     mediaType: data.mediaType,
     username: stories[0].username,
     userAvatar: stories[0].userAvatar,
     uploadTime: 'Just now',
     seen: false
    };
    stories[0].stories.unshift(newStory);
   }
   
   const payload = {
    imageURL: imageurl,
    videoURL: videoUrl,
   };
   console.log('Creating story:', payload);
   await graphqlClient.request<CreateStoryMutation, CreateStoryMutationVariables>(createStory,{ payload});
   await queryClient.invalidateQueries(["all-stories"] as any);
   form.reset();
   setMediaPreview(null);
   setMediaType(null);

  } catch (error) {
   console.error('Error creating story:', error);
  } finally {
   setIsSubmitting(false);
  }
 };

 const handleSelectMediaClick = () => {
  fileInputRef.current?.click();
 };

 return (
  <Form {...form}>
   <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 md:max-w-md bg-gradient-to-b from-black via-gray-900 to-black rounded-2xl shadow-xl transition-all duration-500 border border-indigo-500/20 max-w-xl w-full overflow-hidden relative group hover:-translate-y-1 p-6 animate-fadeIn">
    <div className="rounded-xl border border-white/10 p-4 bg-gray-800 flex flex-col items-center justify-center transition-all duration-500 hover:shadow-lg">
     {mediaPreview ? (
      <div className="relative w-full rounded-lg overflow-hidden shadow-md transition-all duration-500 animate-fadeIn">
       {mediaType === 'image' ? (
        <img src={mediaPreview} alt="Preview" className="w-full h-60 object-cover rounded-lg" />
       ) : (
        <video src={mediaPreview} controls className="w-full h-60 object-cover rounded-lg" />
       )}
       <Button type="button" variant="destructive" size="sm" className="absolute top-2 right-2 shadow-lg hover:bg-red-600 transition-all duration-300 flex items-center gap-2" onClick={() => { setMediaPreview(null); form.setValue('mediaUrl', ''); setMediaType(null); }}>
        <XCircle className="w-4 h-4" /> Remove
       </Button>
      </div>
     ) : (
      <>
       <div className="mb-4 text-story-lightBlue transition-all duration-500 hover:scale-110 animate-pulse">
        <Image size={48} className="opacity-80" />
       </div>
       <p className="text-white/70 mb-4 text-center text-sm">Share a moment with your followers</p>
       <Input type="file" accept="image/*,video/*" id="media-upload" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
       <Button type="button" className="bg-gradient-to-r from-story-blue to-story-lightBlue hover:opacity-90 rounded-lg px-6 py-2 flex items-center gap-2 transition-all duration-500 transform hover:scale-105" onClick={handleSelectMediaClick}>
        <Camera className="h-5 w-5" /> Upload Media
       </Button>
      </>
     )}
    </div>

    <div className="flex justify-end gap-2 mt-4">
     <DialogClose asChild>
      <Button type="button" variant="outline" className="border-white/10 text-white hover:bg-white/10 px-5 py-2 rounded-lg transition-all duration-500 hover:scale-105 flex items-center gap-2">
       <XCircle className="w-4 h-4" /> Cancel
      </Button>
     </DialogClose>
     <Button type="submit" disabled={isSubmitting || !form.getValues().mediaUrl} className="bg-gradient-to-r from-story-blue to-story-lightBlue hover:opacity-90 disabled:opacity-50 px-6 py-2 rounded-lg transition-all duration-500 hover:scale-105 flex items-center gap-2">
      {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Story"}
     </Button>
    </div>
   </form>
  </Form>
 );
};

export default CreateStoryForm;