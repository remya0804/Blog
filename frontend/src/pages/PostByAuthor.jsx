import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';
import PostItem from '../components/PostItem';
import Loading from '../components/Loading';

const PostByAuthor = () => {
  const [post, setPost] = useState([]);
  const [allAuthors, setAllAuthors] = useState(new Map());
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const { postArray, token, setMenuActive, authors } = useContext(BlogContext);


  useEffect(() => {
    if (postArray && authors) {
      // Map authors by ID
      const authorMap = new Map(authors.map((auth) => [auth._id, auth]));
      setAllAuthors(authorMap);

      // Filter posts for the specific author
      const authorPosts = postArray.filter((item) => item.userId === id);
      setPost(authorPosts);

      setLoading(false);


    } else {
      setPost([]);
      setAllAuthors(new Map());
      setLoading(true)
    }

    // Set menu active if token exists
    if (token) {
      setMenuActive('my-posts');
    }

  }, [postArray, token, authors, id, setMenuActive]);

  // Loading state
  if (loading) {
    return <Loading />;
  }

  // No posts found state
  if (!loading && post.length === 0) {
    return <div className="text-center">No posts found!</div>;
  }

  // Render posts
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      {post.map((item, idx) => {
        const authorData = allAuthors.get(item.userId) || {};
        return (
          <PostItem
            key={idx}
            id={item._id}
            thumbnail={item.thumbnail}
            title={item.title}
            desc={item.desc}
            category={item.category}
            author={authorData.name}
            author_img={authorData.thumbnail || '/default-author-img.jpg'} // Fallback
            date={item.date}
          />
        );
      })}
    </div>
  );
};

export default PostByAuthor;
