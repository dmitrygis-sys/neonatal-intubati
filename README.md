# 🫁 Интубация новорождённых — Клинический проспект

Интерактивный образовательный проспект для врачей-неонатологов с AI-ассистентом на базе claude-sonnet-4-6.

---

## 📦 Структура проекта

```
neonatal-intubation/
├── api/
│   └── claude.js             ← Vercel Serverless Function (прокси к Anthropic)
├── public/
│   └── index.html
├── src/
│   ├── index.js              ← точка входа React
│   ├── App.js                ← шапка, табы, роутинг
│   ├── tokens.js             ← дизайн-токены, данные шагов, функция callClaude()
│   ├── Illustrations.js      ← SVG-иллюстрации анатомии
│   └── Tabs.js               ← компоненты четырёх разделов
├── vercel.json               ← конфиг Vercel
├── package.json
└── README.md
```

---

## 🚀 Деплой на Vercel — пошагово

### Шаг 1 — Зарегистрируйтесь
Откройте [vercel.com](https://vercel.com) → Sign Up (можно через GitHub, Google или email).

### Шаг 2 — Создайте репозиторий на GitHub
1. Зайдите на [github.com](https://github.com) → New repository
2. Назовите, например, `neonatal-intubation`
3. Загрузите все файлы этого проекта

### Шаг 3 — Импортируйте в Vercel
1. В Vercel: **Add New → Project**
2. Выберите свой GitHub-репозиторий
3. Framework Preset: **Create React App** (определяется автоматически)
4. Build Command: `npm run build`
5. Output Directory: `build`
6. Нажмите **Deploy**

### Шаг 4 — Добавьте API-ключ Anthropic

В Vercel: **Project → Settings → Environment Variables**

```
Name:   ANTHROPIC_API_KEY
Value:  sk-ant-api03-ваш-ключ-здесь
```

> Получить ключ: [console.anthropic.com](https://console.anthropic.com) → API Keys → Create Key

После добавления переменной: **Deployments → Redeploy** (один клик).

### Шаг 5 — Готово!
Vercel выдаст URL вида:
```
https://neonatal-intubation.vercel.app
```
Отправьте эту ссылку врачу — проспект открывается в любом браузере на любом устройстве.

---

## 🔒 Безопасность API-ключа

API-ключ хранится **только** в переменных окружения Vercel.
Все запросы к Anthropic проходят через `/api/claude` — серверную функцию.
В браузер врача ключ **никогда не передаётся**.

---

## 💻 Локальный запуск (для разработки)

```bash
# Установите зависимости
npm install

# Создайте файл с ключом
echo "ANTHROPIC_API_KEY=sk-ant-api03-ваш-ключ" > .env.local

# Запустите
npm start
# Открывается http://localhost:3000
```

> Для работы serverless-функции локально установите Vercel CLI:
> ```bash
> npm i -g vercel
> vercel dev
> ```

---

## 📋 Разделы проспекта

| Раздел | Содержание |
|--------|-----------|
| 📋 Протокол | 6 шагов интубации с интерактивными чек-листами и прогресс-баром |
| 🫁 Анатомия | SVG-иллюстрации ВДП, ларингоскопа, таблицы размеров ЭТТ и глубин |
| ⚡ Сценарии | ИИ генерирует клинические случаи ОРИТ с разборами и типичными ошибками |
| 🤖 ИИ-консультант | Вопрос-ответ с claude-sonnet-4-6, история вопросов |

---

*Образовательный материал. Не заменяет клиническое суждение врача.*
*Источники: NRP 8th ed. · ERC 2021 · AAP 2024*
