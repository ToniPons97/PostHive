import './PostsContainer.scss';
import Card from '../Card/Card';
import { Post } from '../../entities/Post';
import { RootState, store } from '../../state/Store';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { postsState } from '../../state/PostsState';
import { selectPostsByKeyword } from '../../state/Selectors';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PostsContainer = ({ keyword, showPinnedOnly }: { keyword: string, showPinnedOnly: boolean }) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            const loading = store.getState().ui.loading;
            setIsLoading(loading);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        console.log(showPinnedOnly);
    }, [showPinnedOnly]);

    const posts = useSelector((state: RootState) =>
        selectPostsByKeyword(state, keyword, showPinnedOnly));

    const deletePost = (id: number) =>
        store.dispatch(postsState.actions.remove({ id }));

    const pinPost = (post: Post) => {
        const { id } = post;
        if (post.isPinned)
            store.dispatch(postsState.actions.unpin({ id }));
        else
            store.dispatch(postsState.actions.pin({ id }));
    }

    return (
        <div className='posts-container'>
            <section className='posts-counter'>
                <h1 style={!posts?.length ? { color: "rgb(220, 118, 118)" } : {}}>
                    Results: {posts?.length}
                </h1>
            </section>
            <div className="posts">
                {!isLoading && posts?.map((p: Post) => {
                    return (
                        <Card
                            key={p.id}
                            id={p.id}
                            userId={p.userId}
                            title={p.title}
                            body={p.body}
                            isPinned={p.isPinned}
                            deletePost={deletePost}
                            pinPost={pinPost}
                            keyword={keyword}
                        />
                    );
                })}
                {(!posts?.length && !isLoading) && <h2>No posts were found!</h2>}
                {
                    isLoading &&
                    <FontAwesomeIcon
                        className='loading-posts'
                        size='2xl'
                        icon={faSpinner}
                        spinPulse
                    />
                }
            </div>
        </div>
    );
}

export default PostsContainer;
