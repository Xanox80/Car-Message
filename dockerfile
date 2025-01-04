# Використовуємо базовий образ
FROM node:16

# Встановлюємо робочу директорію
WORKDIR /usr/src/app

# Копіюємо package.json та встановлюємо залежності
COPY package*.json ./
RUN npm install

# Копіюємо всі файли проекту
COPY . .

# Відкриваємо порт
EXPOSE 3000

# Запуск програми
CMD ["npm", "start"]
