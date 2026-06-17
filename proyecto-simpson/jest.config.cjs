module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    // Mockea los módulos CSS (Archivos con extensión .module.css)
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Mockea archivos como imágenes para que no rompan las pruebas
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    // Transpila el código con Babel
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
};
