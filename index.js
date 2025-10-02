import { initAddCommentListener } from './initListeners.js'
import { fetchAndRenderComments } from './fetchAndRenderComments.js'
import { updateComments } from './comments.js'
import { renderComments } from './renderComments.js'

document.querySelector('.comments').innerHTML =
    'Пожалуйста, подождите, комментарии загружаются...'

fetchAndRenderComments().then((data) => {
    updateComments(data)
    renderComments()
})

initAddCommentListener()
