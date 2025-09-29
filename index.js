import { initAddCommentListener } from './initListeners.js'
import { fetchAndRenderComments } from './fetchAndRenderComments.js'
import { updateComments } from './comments.js'
import { renderComments } from './renderComments.js'

fetchAndRenderComments().then((data) => {
    updateComments(data)
    renderComments()
})

initAddCommentListener()
