import {setCookie} from "./cookies.js";
import axios from "axios";

export function startApp (){
    const form = document.querySelector('.form');
    const resultTextOut = document.querySelector('.form_res_out')
    const inputs = document.querySelectorAll('.input')

    const BASE_URL = 'https://test-works.pr-uni.ru/api';

    form.onsubmit = (evt) => {
        evt.preventDefault();
        const login = document.querySelector('.form_login').value;
        const password = document.querySelector('.form_password').value;
        const authorizationSuccessful = document.querySelector('.authorization__successful')
        const payload = new URLSearchParams({login, password})
        const preloader = document.querySelector('.preloader')

        preloader.style.display = 'flex';

        fetch(`${BASE_URL}/login?${payload}`).then(res  => {
            if (res.status === 'ok') {
                const token = res.token;
                setCookie('jwtToken', token, 7);
                form.remove()
                authorizationSuccessful.innerText = `${res.user.name}, Вы успешно авторизованы!```
            }
        }).catch(err => {
            console.error(err);

            resultTextOut.innerText = err
            resultTextOut.style.color = 'red'
            inputs.forEach((el) => {
                el.style.border = '1px solid red'
                el.style.color = 'red'
            })

        }).finally(() => {
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 1000)
        })
    }
}

