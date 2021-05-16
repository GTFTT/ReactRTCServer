import React, { Component } from 'react'
import cat from '../../img/cat.jpg'
import Styles from './styles.module.css'

export default class Home extends Component {
    render() {
        return (
                <dl>
                    <dt>Протокол прибирання RTC</dt>
                    <dd><ol>
                        <li>Робот увімкнувся і звірив свою позицію(він буде робити ? місцевості)</li>
                        <li>Робот зв'язався з док станцією через WiFi для отримання вказівок(де прибрати і яким чином, док станція буде сама казати коли починати, це іде через додаток)</li>
                        <li>Коли вказівки отримано робот визначає вхід до док станції і заїжджає в миючий блок</li>
                        <li>Док станція детектить наявність робота(команда виконана) і запускає протокол мийки швабри</li>
                        <li>Коли протокол миття швабрився добрався до 9 рівня станція відправляє сигнал запуску протоколу миття</li>
                        <li>По досягненню останньої точки залишається процедура очищення та повернення до шлюзу</li>
                        <li>Після завершення процедури очищення з'являється задача на повернення до док станції</li>
                        <li>По поверненню робот впадає в депресію через сірість буття. Жарт, він впадає в сплячий режим(очікує команд).</li>
                    </ol></dd>
                    <dt>Протокол миття швабри(процедура очистки)</dt>
                    <dd><ol>
                        <li>Закрити шлюз</li>
                        <li>Зафіксувати швабру</li>
                        <li>Включити подачу води з миючим засобом</li>
                        <li>Через деякий час увімкнути щітки</li>
                        <li>Через деякий час зупинити напрям оберту  щітки кілька разів для кращої очистки</li>
                        <li>Зупинити щітки</li>
                        <li>Зупинити воду</li>
                        <li>Відкрити шлюз</li>
                        <li>Звільнити швабру</li>
                        <li>Увімкнути відкачку відпрацьованої води</li>
                    </ol></dd>
                    <dt>Протокол миття</dt>
                    <dd><ol>
                        <li>Загрузити карту з цільовими точками(точки які робот повинен відвідати по можливості)</li>
                        <li>Виїхати на стартову цільову точку і розвернутись в напрямку руху</li>
                        <li>Опустити швабру(їздити треба з високо піднятою ? Так, щоб не задіти коври.</li>
                        <li>Почати рух до указаної точки</li>
                        <li>Після певної відстані повернутись для процедури очистки</li>
                    </ol></dd>
                </dl>
        )
    }
}