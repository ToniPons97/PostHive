import { useEffect, useState } from "react";
import axios from "axios";
import { Post } from "../entities/Post";

export const useFetchPosts = (apiUrl: string) => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const abortController = new AbortController();

        const fetchPosts = () => {
            axios.get<Post[]>(apiUrl, { 
                signal: abortController.signal 
            }).then(res => setPosts(res.data))
            .catch(error => {
                    if (error.name === 'CanceledError')
                        console.error('Request aborted');
                    else
                        console.error(error);
                }
            );
        }

        fetchPosts();
        return () => abortController.abort();
    }, []);

    /*
        This is how I would send a delete request to the server, passing the id as a Get parameter.
        Here I'm assuming there's an endpoint listening for delete requests,
        with the format: https://jsonplaceholder.typicode.com/posts/:id

        Note: I'm not typing the axios request like above, since I would need to know the format
        of the server's response.
    */
   const deletePostOnServer = (id: number) => {
       axios.delete(`apiUrl/${id}`)
           .then(res => console.log('Deleted successfully'))
           .catch(err => console.error(err));
   }
   
    // To finish the implementation I would add deletePostOnServer to the return object.
    // Then I would change this hook's name to usePosts (more general, we're not only fetching data).

    return { posts, setPosts };
}