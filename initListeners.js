import { comments } from './comments.js'
import { renderComments } from './renderComments.js'
import { updateComments } from './comments.js'

export const replyСomment = () => {
    const textEl = document.getElementById('text')
    const replyElements = document.querySelectorAll('.comment')

    for (const replyElement of replyElements) {
        replyElement.addEventListener('click', () => {
            const index = replyElement.dataset.index
            const comment = comments[index]

            textEl.value = `* ${comment.author}: ${comment.text} \n\n`
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
    let date1 = new Date().toLocaleDateString()
    let date2 = new Date().toLocaleTimeString().slice(0, -3)
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

        const NewComment = {
            name: nameEl.value.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
            // date: date1 + ' ' + date2,
             text: textEl.value.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
            // likes: 0,
            // aktive: false,
        }

        fetch('https://wedev-api.sky.pro/api/v1/kalinina/comments', {
            method: "POST",
            body: JSON.stringify(NewComment)
        }).then((response) => {
            return response.json()
        }).then((data) => {
            updateComments(data.comments)
            renderComments()
        })

        likeButtons()
        replyСomment()

        nameEl.value = ''
        textEl.value = ''
    })
}
