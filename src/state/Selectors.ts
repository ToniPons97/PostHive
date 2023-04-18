import { RootState } from "./Store";
import { Post } from "../entities/Post";

export const selectPostsByKeyword = (state: RootState, keyword: string, showPinnedOnly: boolean): Post[] => {
    const { posts } = state.posts;

    const filteredPosts = keyword
        ? posts.filter((p) => p.title.toLowerCase().includes(keyword.toLowerCase()) || p.body.toLowerCase().includes(keyword.toLowerCase()))
        : posts;


    // Filter pinned posts if showPinnedOnly is true
    if (showPinnedOnly) {
        return filteredPosts.filter((p) => p.isPinned);
    }

    return filteredPosts;
};
