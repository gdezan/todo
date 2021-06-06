module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  maxWorkers: 1,
  testMatch: ["**/__tests__/**/*.[jt]s?(x)"],
};
