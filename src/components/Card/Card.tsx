import './Card.scss';
import { 
    faUser, 
    faThumbTack, 
    faTrashCan, 
    faPen,
    faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Post } from '../../entities/Post';
import { ChangeEvent, useEffect, useState } from 'react';
import { store } from '../../state/Store';
import { postsState } from '../../state/PostsState';
import Keywords from 'react-keywords';

type CardProps = {
    deletePost: (id: number) => void,
    pinPost: (post: Post) => void,
    keyword: string
} & Post

const Card = ({
    id,
    userId,
    title,
    body,
    isPinned = false,
    deletePost,
    pinPost,
    keyword
}: CardProps) => {
    const [ isEditable, setIsEditable ] = useState(false);
    const [ editedPost, setEditedPost ] = useState(body);
    const [ isEdited, setIsEdited ] = useState(false);
    const [ saveEnabled, setSaveEnabled ] = useState(false);
    
    const handlePinPost = () => {
        const post: Post = { id, userId, title, body, isPinned: isPinned };
        pinPost(post);
    }

    const handlePostDeletion = () => {
        deletePost(id);
    }
    
    const handleEditClick = () => {
        setIsEditable(prev => !prev);
        if (isEditable)
            setIsEdited(editedPost.trim() !== body.trim());
    }
    
    const handlePostEdit = (ev: ChangeEvent<HTMLParagraphElement>): void => {
        setEditedPost(prev => ev.target.innerText.trim());
        setIsEdited(true);
    }

    const handleSavePost = () => {
        if (saveEnabled) {
            store.dispatch(postsState.actions.editPost({id, data: editedPost.trim()}));
            setIsEditable(prev => false);
            setIsEdited(prev => false);
            setSaveEnabled(prev => false);
        }
    }

    useEffect(() => {
        setSaveEnabled(isEdited);
    }, [isEdited]);

    useEffect(() => {
        if (editedPost.length === 0 && saveEnabled)
            setSaveEnabled(prev => false);
        else if (!saveEnabled && isEditable && editedPost.length > 0)
            setSaveEnabled(prev => true);
    }, [editedPost]);

    return (
        <article className={`post ${isPinned ? 'pinned' : ''}`}>
            <section className='user-id'>
                <p>user #{userId}</p>
            </section>
            <section className='top'>
                <div className='avatar'>
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <div className='title'>
                        <p>
                        <Keywords value={keyword}>
                            {title}
                        </Keywords>
                        </p>
                </div>
            </section>
            <section className="body">
                    <p
                        contentEditable={isEditable} 
                        onInput={handlePostEdit}
                    >
                        {
                            isEditable ? body :
                                <Keywords value={keyword}>
                                    {body}
                                </Keywords>
                        }
                    </p>
            </section>
            <section className='bottom'>
                <button 
                    onClick={handleEditClick}
                    className='edit-post'
                >
                    <FontAwesomeIcon icon={faPen} />
                </button>
                <button 
                    onClick={handleSavePost}
                    className='save-post'
                >
                    <FontAwesomeIcon 
                        style={saveEnabled ? {} : {color: '#b0b0c3', cursor:'not-allowed'}} 
                        icon={faFloppyDisk} 
                    />
                </button>
                <button 
                    onClick={handlePinPost} 
                    className='pin'
                >
                    <FontAwesomeIcon icon={faThumbTack} />
                </button>
                <button 
                    onClick={handlePostDeletion} 
                    className='remove'
                >
                    <FontAwesomeIcon icon={faTrashCan} />
                </button>
                {isEditable ? <p className='edit-mode'>edit mode</p> : ''}
            </section>
        </article>
    );
}
export default Card;