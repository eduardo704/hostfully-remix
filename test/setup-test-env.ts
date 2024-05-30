import { installGlobals } from "@remix-run/node";
import "@testing-library/jest-dom/vitest";

installGlobals();

module.exports = {
    clearMocks: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/prisma.mock.singleton.ts'],
  }