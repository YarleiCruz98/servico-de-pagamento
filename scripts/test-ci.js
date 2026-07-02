const { mkdirSync } = require('fs');
const { spawnSync } = require('child_process');

mkdirSync('reports', { recursive: true });

const mochaArgs = ['mocha', 'test/**/*.test.js'];

function run(args) {
  const result = spawnSync('npx', args, {
    stdio: 'inherit',
    shell: true,
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run([
  ...mochaArgs,
  '--reporter',
  'spec',
]);

run([
  ...mochaArgs,
  '--reporter',
  'mocha-junit-reporter',
  '--reporter-options',
  'mochaFile=reports/junit.xml',
]);

run([
  ...mochaArgs,
  '--reporter',
  'mochawesome',
  '--reporter-options',
  'reportDir=reports,reportFilename=index,quiet=true,overwrite=true,html=true,json=true',
]);
