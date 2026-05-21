import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [posts, setPosts] = useState([]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const [editingId, setEditingId] = useState(null);


  // FETCH POSTS
  const fetchPosts = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/posts"
      );

      setPosts(res.data);

    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchPosts();
  }, []);



  // ADD OR UPDATE POST
  const handleSubmit = async () => {

    if (!title || !author || !content) {
      alert("Please fill all fields");
      return;
    }

    const newPost = {
      title,
      author,
      content,
    };

    try {

      // UPDATE
      if (editingId) {

        await axios.put(
          `http://localhost:5000/posts/${editingId}`,
          newPost
        );

        setEditingId(null);
      }

      // CREATE
      else {

        await axios.post(
          "http://localhost:5000/posts",
          newPost
        );
      }

      setTitle("");
      setAuthor("");
      setContent("");

      fetchPosts();

    } catch (error) {
      console.log(error);
    }
  };



  // DELETE POST
  const deletePost = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/posts/${id}`
      );

      fetchPosts();

    } catch (error) {
      console.log(error);
    }
  };



  // EDIT POST
  const editPost = (post) => {

    setTitle(post.title);
    setAuthor(post.author);
    setContent(post.content);

    setEditingId(post._id);
  };



  return (

    <div className="container">

      <h1>Blog App</h1>


      <div className="form">

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />


        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />


        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />


        <button onClick={handleSubmit}>
          {editingId ? "Update Post" : "Add Post"}
        </button>

      </div>



      <div className="posts">

        {posts.map((post) => (

          <div className="card" key={post._id}>

            <h2>{post.title}</h2>

            <h4>{post.author}</h4>

            <p>{post.content}</p>


            <div className="buttons">

              <button onClick={() => editPost(post)}>
                Edit
              </button>


              <button onClick={() => deletePost(post._id)}>
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default App;