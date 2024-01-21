import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Section, RTE } from "../index"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import servie from '../../appwrite/config';

export default function PostForm({ post }) {
  const [state, setstate] = useState(false)
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      status: post?.status || 'active',
    },
  })
  const navigate = useNavigate()
  const useDate = useSelector((ste) => ste.auth.userdata);
  const Submit = async (date) => {
    setstate(true)
    if (post) {
      const file = await date.image[0] ? servie.updatepost(date.image[0]) : null;
      if (file) {
        servie.deletefile(post.Img_data)
      }
      const dbpost = await servie.updatepost(
        post.$id, {
        ...date,
        Img_data: file ? file.$id : undefined
      }
      )
      if (dbpost) {
        navigate(`/post/${dbpost.$id}`)
      }
    } else {
      const file = await servie.uploadfile(date.image[0]);
      if (file) {
        const fileid = file.$id;
        date.Img_data = fileid;
        const dbpost = await servie.createpost({
          userid: useDate.$id,
          ...date,
        })
        if (dbpost) {
          navigate(`/post/${dbpost.$id}`)
        }
      }
    }
  }

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {

      // one methed
      // const slug=value.toLowerCase().repeat(/ /g,'_')
      // setValue('slug',slug)
      // return slug

      //second Method
      return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-");
    }
  })

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title, { shouldValidate: true }))
      }
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(Submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          disabled
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={servie.getfileProview(post.Img_data)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Section
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button type="submit" bgcolor={post ? "bg-green-500" : undefined} className="w-full">
          {post ? "Update" : "Submit"}
        </Button>
        {state ? <p className='text-center'>Data Sending...</p> : ""}
      </div>
    </form>
  )
}
