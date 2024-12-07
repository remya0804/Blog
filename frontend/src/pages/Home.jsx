import React, { useContext, useEffect, useState } from 'react';
import { BlogContext } from '../context/BlogContext';
import PostItem from '../components/PostItem';
import Loading from '../components/Loading';

const Home = () => {
  const { postArray, authors } = useContext(BlogContext);

  const [allPosts, setAllPosts] = useState([]);
  const [allAuthors, setAllAuthors] = useState(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (postArray?.length && authors?.length) {
      
      const authorMap = new Map(authors.map((auth) => [auth._id, auth]));
      
      setAllPosts(postArray);
      setAllAuthors(authorMap);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [postArray, authors]);

  if (loading) {
    return <Loading />;
  }

  if (!allPosts.length) {
    setLoading(false)

    return <div>No posts available</div>;
  }
  if (!authors.length) {
    setLoading(false)

    return <div>No Authors available</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {allPosts
          .slice()
          .reverse()
          .map((item) => {

            const authData = allAuthors.get(item.userId);
            
            return (
              <PostItem
                key={item._id}
                id={item._id}
                thumbnail={item.thumbnail}
                title={item.title}
                desc={item.desc}
                category={item.category}
                author={authData ? authData.name : ''}
                author_img={authData ? authData.thumbnail : ''}
                date={item.date}
                userId={authData?._id || ''}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Home;
