const postService = {
    updatePost: async (userId, updatedPost) => {
        const postIndex = postsData.findIndex(p => p.userId === userId && p.id === updatedPost.id);
        if (postIndex === -1) throw exceptionGenerator("Post to update not found", 404);
        postsData[postIndex] = {...postsData[postIndex], ...updatedPost};
        return postsData[postIndex];
    },
}

export { postService }