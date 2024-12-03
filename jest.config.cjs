module.exports = {
    testEnvironment: "jsdom", // Позволяет тестировать компоненты React
    transform: {
      "^.+\\.jsx?$": "babel-jest", // Используем Babel для обработки JS/JSX файлов
    },
    moduleFileExtensions: ["js", "jsx"], // Расширения файлов для поиска тестов
    setupFilesAfterEnv: ["@testing-library/jest-dom"], // Подключение Jest DOM для тестов
  };
  