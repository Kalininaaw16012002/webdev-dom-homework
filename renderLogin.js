export const renderLogin = () => {
    const container = document.querySelector('.container')

    const loginHTML = `
    <section class = "add-form">
        <h1>Форма входа</h1>
        <input 
            type = "text"
            class = "add-form-name"
            placeholder = "Введите логин"
            id ="login"
            required 
            />
        <input 
            type = "text"
            class = "add-form-name"
            placeholder = "Введите пароль"
            id ="password"
            required 
        ></input>
        <fieldset class = "add-form-registry">
            <button class = "add-form-button-main button-main" type = "sumbit"> Войти </button>
            <u class="add-form-button-link registry" > Зарегистрироваться </u>
        </fieldset>
    </section>`

    container.innerHTML = loginHTML
}