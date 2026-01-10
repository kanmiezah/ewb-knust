import React, { useEffect, useState } from "react";
import { client, urlFor } from "../../sanityClient";

export default function Gallery() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "gallery" && defined(image.asset)]{
          _id,
          title,
          description,
          image
        }`
      )
      .then((data) => {
        // 🔀 Shuffle randomly (safe & reliable)
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setProjects(shuffled);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <section className="px-6 py-16 max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold mb-4">Our EWB Family</h2>
        <p className="text-gray-500 max-w-xl mx-auto"></p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="group relative overflow-hidden rounded-2xl shadow-lg"
          >
            {/* Image */}
            <img
              src={urlFor(project.image).width(600).height(600).url()}
              alt={project.title}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Description-only hover */}
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center text-center px-4">
              <p className="text-white text-sm leading-relaxed line-clamp-4">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
