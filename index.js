import { renderComments } from './renderComments.js'
import { initAddCommentListener } from './initListeners.js'
import { updateComments } from './comments.js'

fetch('https://wedev-api.sky.pro/api/v1/kalinina/comments')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        updateComments(data.comments)
        renderComments()
    })

initAddCommentListener()
