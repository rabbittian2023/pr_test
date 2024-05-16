import { execSync } from 'node:child_process';
import * as fs from 'node:fs';

const typeMap = {
  feat: 'code',
  style: 'code',
  refactor: 'code',
  perf: 'code',
  revert: 'code',
  types: 'code',
  wip: 'code',
  chore: 'tool',
  build: 'tool',
  ci: 'tool',
  test: 'test',
  fix: 'bug',
  docs: 'doc',
};

function updateContributors(username, type) {
  const content = fs.readFileSync('.all-contributorsrc', 'utf-8');
  const contributors = JSON.parse(content);
  
  console.log('contributors: ', contributors);
  console.log('username', username);
  console.log('type: ', type);
  // 检查用户是否已存在
  const exists = contributors.contributors.some((contributor) => contributor.login === username);
  if (!exists) {
    console.log(`Adding new contributor: ${username}`);
    const command = `npx all-contributors-cli add ${username} ${type}`;
    console.log(`Running command: ${command}`);
    execSync(command, { stdio: 'inherit' });
    console.log('成功添加贡献者.');
    
    // Generate the contributors list after adding a new contributor
    console.log('生成贡献者名单...');
    const generateCommand = 'npx all-contributors-cli generate';
    console.log(`Running command: ${generateCommand}`);
    execSync(generateCommand, { stdio: 'inherit' });
    console.log('贡献者名单已更新.');
  } else {
    console.log('已存在贡献者，跳过...');
  }
}

function main() {
  const username = process.env.GITHUB_ACTOR;
  
  console.log('fix: 111updateContribcutors.js - GITHUB_ACTOR :>> ', username);
  if (!username) {
    console.error('未定义 GITHUB_ACTOR。.');
    process.exit(1);
  }
  
  const lastCommitMessage = execSync('git log -1 --pretty=%B').toString().trim();
  const commitType = lastCommitMessage.split(' ')[0];
  const contributionType = typeMap[commitType] || 'code';
  
  updateContributors(username, contributionType);
  
  // 检查 git status 以确认有变更
  const changes = execSync('git status --porcelain').toString().trim();
  console.log('Git changes:', changes);
  if (changes) {
    console.log('检测到更改，继续提交.');
  } else {
    console.log('未检测到更改，跳过提交.');
  }
}

main();

// 测试all contributorsrc
// test1
// test2
// test3
// test4
// test5
// test6
// test7
// test8
// test9
// test10
// test10
// test11
// test12
// test13
// test14
// test15
// test16
// 测试1
// 测试2
// 测试3
// 测试4
// 测试5
// 测试6
// 测试7
// 测试8
// 测试9
// 测试10
// 测试11
// 测试12
// 测试13
// 测试14
