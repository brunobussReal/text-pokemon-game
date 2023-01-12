module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/src/components/**/*.test.tsx'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testEnvironment: 'jsdom',
  preset: "react-scripts"
  
};
