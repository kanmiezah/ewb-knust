import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { client } from "../sanityClient";
import { PortableText } from "@portabletext/react";

export default function SinglePost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch single post
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const data = await client.fetch(
          `*[_type == "post" && slug.current == $slug][0]{
            title,
            subHeading,
            description,
            body,
            author -> { name },
            mainImage { asset -> { url }, alt },
            categories[] -> { title }
          }`,
          { slug }
        );
        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // PortableText components (memoized)
  const portableTextComponents = useMemo(
    () => ({
      block: {
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold mb-4">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-semibold mb-4">{children}</h2>
        ),
        normal: ({ children }) => (
          <p className="text-lg my-4 text-gray-700">{children}</p>
        ),
      },
      marks: {
        strong: ({ children }) => (
          <strong className="font-bold">{children}</strong>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,
      },
      list: {
        bullet: ({ children }) => (
          <ul className="list-disc ml-6 my-4">{children}</ul>
        ),
        number: ({ children }) => (
          <ol className="list-decimal ml-6 my-4">{children}</ol>
        ),
      },
      listItem: {
        bullet: ({ children }) => <li className="mb-2">{children}</li>,
        number: ({ children }) => <li className="mb-2">{children}</li>,
      },
      types: {
        image: ({ value }) => (
          <img
            src={value.asset?.url}
            alt={value.alt || "Embedded Image"}
            className="my-6 rounded-lg shadow-md w-full"
          />
        ),
      },
    }),
    []
  );

  // Loading component
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Loading post...</p>
      </div>
    );
  }

  // Not found component
  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Post not found.</p>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 bg-stone-100 text-neutral-800 mt-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Main Image */}
        <img
          src={post.mainImage?.asset?.url || "https://via.placeholder.com/800"}
          alt={post.mainImage?.alt || post.title || "Post Image"}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">
          {/* Title & Subheading */}
          <h1 className="text-3xl font-bold text-gray-900">
            {post.title || "Untitled"}
          </h1>
          {post.subHeading && (
            <h2 className="text-xl text-gray-600 mt-2">{post.subHeading}</h2>
          )}

          {/* Metadata */}
          <div className="flex flex-wrap items-center text-sm text-gray-500 my-4 gap-2">
            {post.author?.name && <span>By {post.author.name}</span>}
            {post.categories?.length > 0 &&
              post.categories.map((cat, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-gray-200 rounded-full text-sm text-gray-700"
                >
                  {cat.title}
                </span>
              ))}
          </div>

          {/* Description */}
          {post.description && (
            <p className="text-gray-700 my-4">{post.description}</p>
          )}

          {/* Body */}
          {post.body && (
            <div className="mt-6">
              <PortableText
                value={post.body}
                components={portableTextComponents}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
