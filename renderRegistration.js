import { registration, setName, setToken, token, name } from "./fetchAndRenderComments.js"
import { fetchComments } from "./index.js"
import { renderLogin } from "./renderLogin.js"

export const renderRegistration = () => {
    const container = document.querySelector('.container')

    const loginHTML = `
    <section class = "add-form">
        <h1 class="entry-form">Форма регистрации</h1>
        <input 
            type = "text"
            class = "add-form-name"
            placeholder = "Введите имя"
            id ="name"
            required 
            />
        <input 
            type = "text"
            class = "add-form-name"
            placeholder = "Введите логин"
            id ="login"
            required 
            />
        <input 
            type = "password"
            class = "add-form-name"
            placeholder = "Введите пароль"
            id ="password"
            required 
        ></input>
        <fieldset class = "add-form-registry">
            <button class = "add-form-button-main button-main" type = "sumbit"> Зарегистрироваться </button>
            <u class="add-form-button-link entry" > Войти </u>
        </fieldset>
    </section>`

    container.innerHTML = loginHTML

    document.querySelector('.entry').addEventListener('click', () => {
        renderLogin()
    })

    const nameEl = document.querySelector('#name')
    const loginEl = document.querySelector('#login')
    const passwordEl = document.querySelector('#password')
    const submitButtonEl = document.querySelector('.button-main')

    submitButtonEl.addEventListener('click', () => {
        registration(nameEl.value, loginEl.value, passwordEl.value).then((response) => {
            return response.json()
        }).then((data) => {
            setToken(data.user.token)
            setName(data.user.name)
            fetchComments()
        }).catch((error) => {
                if (error.message === 'Неверный запрос') {
                    alert('Пользователь с таким логином уже существует')
                }
            })
    })
}