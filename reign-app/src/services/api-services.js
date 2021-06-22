import axios from "axios";

export async function findPosts(setCallback, setLoading) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts`);
    setCallback(response.data);
    setLoading(false);
  } catch (error) {
    console.error(error);
  }
}

export async function deletePost(id) {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/posts/${id}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}
