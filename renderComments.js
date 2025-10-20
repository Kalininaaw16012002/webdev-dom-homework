import { comments } from './comments.js'
import { token } from './fetchAndRenderComments.js'
import { likeButtons, replyСomment } from './initListeners.js'
import { renderLogin } from './renderLogin.js'

export const renderComments = () => {
    const container = document.querySelector('.container')
    const coomentsHTML = comments
        .map((comment, index) => {
            return `<li class="comment" data-index=${index}>
          <div class="comment-header"> 
            <div>${comment.name}</div>
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

    const addCommentsHTML = `
            <div class="add-form">
                <input
                    type="text"
                    class="add-form-name"
                    id="name"
                    placeholder="Введите ваше имя"
                    readonly
                    value ="${name}"
                />
                <textarea
                    type="textarea"
                    class="add-form-text"
                    id="text"
                    placeholder="Введите ваш коментарий"
                    rows="4"
                ></textarea>
                <div class="add-form-row">
                    <button class="add-form-button" id="add">Написать</button>
                </div>
            </div>
            <div class="comment-loading">Комментарий добавляется...</div>`
    
    const linkToLoginText = `<p> чтобы отправить комментарий, <span class='link-login'>войдите</span></p> `

    const baseHTML = `<ul class="comments">${coomentsHTML}</ul>${token ? addCommentsHTML: linkToLoginText}`

    container.innerHTML = baseHTML

    if (token) {
      likeButtons()
      replyСomment()
      initAddCommentListener()
    } else {
      document.querySelector(".link-login").addEventListener('click', () => {
        renderLogin()
      })
    }
}
