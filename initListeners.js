import { comments, updateComments } from './comments.js'
import { renderComments } from './renderComments.js'
import { postComments } from './fetchAndRenderComments.js'

export const replyСomment = () => {
    const textEl = document.getElementById('text')
    const replyElements = document.querySelectorAll('.comment')

    for (const replyElement of replyElements) {
        replyElement.addEventListener('click', () => {
            const index = replyElement.dataset.index
            const comment = comments[index]

            textEl.value = `* ${comment.name}: ${comment.text} \n\n`
        })
    }
}

export const likeButtons = () => {
    const likeElements = document.querySelectorAll('.like-button')

    for (const likeElement of likeElements) {
        likeElement.addEventListener('click', (event) => {
            event.stopPropagation()
            if (comments[likeElement.dataset.index].aktive === true) {
                comments[likeElement.dataset.index].aktive = false
                comments[likeElement.dataset.index].likes--
            } else {
                comments[likeElement.dataset.index].aktive = true
                comments[likeElement.dataset.index].likes++
            }
            likeButtons()
            replyСomment()
            renderComments()
        })
    }
}

export const initAddCommentListener = () => {
    const nameEl = document.getElementById('name')
    const buttonEl = document.getElementById('add')
    const textEl = document.getElementById('text')
    buttonEl.addEventListener('click', () => {
        nameEl.classList.remove('error')
        textEl.classList.remove('error')

        if (textEl.value === '' && nameEl.value === '') {
            nameEl.classList.add('error')
            textEl.classList.add('error')
            return
        }

        if (nameEl.value === '') {
            nameEl.classList.add('error')
            return
        }

        if (textEl.value === '') {
            textEl.classList.add('error')
            return
        }

        document.querySelector('.comment-loading').style.display = 'block'
        document.querySelector('.add-form').style.display = 'none'

        postComments(
            textEl.value.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
            nameEl.value.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
        )
            .then((data) => {
                document.querySelector('.comment-loading').style.display =
                    'none'
                document.querySelector('.add-form').style.display = 'flex'
                updateComments(data)
                renderComments()
                nameEl.value = ''
                textEl.value = ''
            })
            .catch((error) => {
                document.querySelector('.comment-loading').style.display =
                    'none'
                document.querySelector('.add-form').style.display = 'flex'

                if (error.message === 'Failed to fetch') {
                    alert('Кажется, у вас сломался интернет, попробуйте позже')
                }

                if (error.message === 'Ошибка сервера') {
                    alert('Сервер сломался, попробуй позже')
                }

                if (error.message === 'Неверный запрос') {
                    alert('Имя и комментарий должны быть не короче 3 символов')
                }
            })

        likeButtons()
        replyСomment()
    })
}
