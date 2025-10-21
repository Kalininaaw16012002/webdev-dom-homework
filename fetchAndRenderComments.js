const authHost = 'https://wedev-api.sky.pro/api/user'

export let token = ''

export const setToken = (newToken) => {
    token = newToken
}

export let name = ''

export const setName = (newName) => {
    name = newName
}

export const fetchAndRenderComments = () => {
    return fetch('https://wedev-api.sky.pro/api/v2/kalinina/comments')
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
    return fetch('https://wedev-api.sky.pro/api/v2/kalinina/comments', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
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

export const login = (login, password) => {
    return fetch(authHost + '/login', {
        method: 'POST',
        body: JSON.stringify({
            login: login,
            password: password,
        }),
    })
}

export const registration = (name, login, password) => {
    return fetch(authHost, {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            login: login,
            password: password,
        }),
    })
}
