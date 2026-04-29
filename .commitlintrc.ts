/**
 * - Type(필수): Commit의 종류. (Feature, Update, Docs, Fix, Refactor, Config)
 * - Scope(선택): Commit의 범위.
 * - Subject(필수): Commit의 제목. 되도록 간결하게 작성하고, 명사형 어미로 끝나도록 한다.
 * - Body(선택): Commit의 상세 내용. 제목과 본문 사이에는 한 줄을 띄워 분리한다.
 * - Footer(선택): Issue Tracker ID를 추가한다.
 *
 * @example Feature: Add new API endpoint
 */
import { UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Commit Type
    'type-enum': [2, 'always', ['Feature', 'Update', 'Docs', 'Fix', 'Refactor', 'Config']],
    'type-case': [2, 'always', 'start-case'],
    'type-empty': [2, 'never'],

    // Subject
    'subject-full-stop': [2, 'never', '.'],
    'subject-exclamation-mark': [2, 'never', '!'],
    'subject-case': [2, 'never', []],
    'subject-empty': [2, 'never'],
  },
  ignores: [
    (message: string) =>
      message.startsWith('Merge') ||
      message.startsWith('Revert') ||
      message.startsWith('Amend') ||
      message.startsWith('Reset') ||
      message.startsWith('Rebase') ||
      message.startsWith('Tag'),
  ],
};

export default Configuration;
