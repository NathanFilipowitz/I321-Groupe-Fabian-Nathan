const postController = {
    updatePost: async (req, res) => {
        const errorMsgs = joiValidator(
            req.body,
            postSchemas.updatePostSchema
        );
        if (errorMsgs) {
            return responseSender.sendValidationError(res, errorMsgs);
        }
        const post = await postService.updatePost(
            req.user.userId,
            req.body
        );
        return responseSender.sendSuccessResponse(res, post);
    },

}

export { postController }