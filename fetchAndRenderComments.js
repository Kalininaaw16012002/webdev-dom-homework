export const fetchAndRenderComments = () => {
    return fetch('https://wedev-api.sky.pro/api/v1/kalinina/comments')
        .then((response) => {
            return response.json()
        })
        .then((responseData) => {
            const appComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date:
                        new Date(comment.date).toLocaleDateString() +
                        ' ' +
                        new Date(comment.date)
                            .toLocaleTimeString()
                            .slice(0, -3),
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: false,
                }
            })
            return appComments
        })
}

export const postComments = (text, name) => {
    return fetch('https://wedev-api.sky.pro/api/v1/kalinina/comments', {
        method: 'POST',
        body: JSON.stringify({
            text,
            name,
        }),
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Ошибка сервера')
            }

            if (response.status === 400) {
                throw new Error('Неверный запрос')
            }

            if (response.status === 201) {
                return response.json()
            }
        })
        .then(() => {
            return fetchAndRenderComments()
        })
}
