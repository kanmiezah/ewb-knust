import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client, urlFor } from "../sanityClient";
import { PortableText } from "@portabletext/react";

export default function SingleProject() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);

  async function fetchSingleProject() {
    try {
      const data = await client.fetch(
        `*[_type == "project" && slug.current == $slug]{
          title,
          location,
          body,
          projectCompleted,
          mainImage {
            asset->{
              url
            }
          },
          galleryImages[] {
            asset->{
              url
            }
          }
        }`,
        { slug }
      );
      setProject(data[0]);
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  }

  useEffect(() => {
    fetchSingleProject();
  }, [slug]);

  if (!project) {
    return (
      <section className="w-full py-20 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">No project found.</p>
      </section>
    );
  }

  return (
    <section className="w-full py-16 flex flex-col items-center bg-gray-50 text-gray-800">
      <div className="max-w-6xl w-full px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative mb-10">
          <img
            src={project.mainImage.asset.url}
            alt={project.title}
            className="w-full h-96 sm:h-[500px] object-cover rounded-xl shadow-lg"
          />
          <div className="absolute bottom-6 left-6 bg-black bg-opacity-50 px-4 py-2 rounded text-white">
            <h1 className="text-3xl sm:text-4xl font-bold">{project.title}</h1>
            <p className="mt-1 text-sm sm:text-base">
              Location: {project.location} | Completed:{" "}
              {project.projectCompleted}
            </p>
          </div>
        </div>

        {/* Project Description */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-10">
          <div className="prose prose-lg max-w-full text-gray-700">
            <PortableText value={project.body} />
          </div>
        </div>

        {/* Gallery */}
        {project.galleryImages && project.galleryImages.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800">
              Project Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={image.asset.url}
                    alt={`Gallery Image ${index + 1}`}
                    className="w-full h-56 sm:h-64 object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
