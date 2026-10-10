import { execSync } from 'node:child_process';

// The commit a build came from (first 6 characters), shown in the footer so we can tell which version is live.
// CI sets GITHUB_SHA; local builds ask git.
const commit = (): string => {
  if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA;
  try {
    return execSync('git rev-parse HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  } catch {
    return '';
  }
};

export const version = commit().slice(0, 6);
