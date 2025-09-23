import { comments } from './comments.js'
import { likeButtons, replyСomment } from './initListeners.js'

export const renderComments = () => {
    const listEl = document.getElementById('list')
    listEl.innerHTML = comments
        .map((comment, index) => {
            return `<li class="comment" data-index=${index}>
          <div class="comment-header"> 
            <div>${comment.author.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.text}
            </div> 
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button data-index=${index} class="like-button ${comment.aktive ? '-active-like' : ''}"></button>
            </div>
          </div>
        </li>`
        })
        .join('')

    likeButtons()
    replyСomment()
}
