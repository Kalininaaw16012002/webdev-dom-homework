import { fetchAndRenderComments } from './fetchAndRenderComments.js'
import { updateComments } from './comments.js'
import { renderComments } from './renderComments.js'


export const fetchComments = (isFirstLoading) => {
    if (isFirstLoading) {
        document.querySelector('.container').innerHTML = `<p>Пожалуйста, подождите, комментарии загружаются...</p>`}

    fetchAndRenderComments().then((data) => {
    updateComments(data)
    renderComments()
})
}

fetchComments(true)