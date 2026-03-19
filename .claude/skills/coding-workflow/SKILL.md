---
name: coding-workflow
description: Use when starting any coding task - enforces mandatory git worktree isolation, test-driven development, conventional commits, and PR creation workflow. Paperclip-aware
---

# Coding Workflow

## Overview

Mandatory workflow for all coding tasks: isolate work in a git worktree, write tests alongside features, commit with Conventional Commits, create a PR, then clean up.

## Workflow

### 1. Before Editing (MANDATORY)

Create a worktree on a new branch under the project root's `.worktrees/` directory:

```bash
git worktree add .worktrees/<feature-name> -b <feature-name>
```

Work exclusively inside that worktree directory.

**REQUIRED:** See superpowers:using-git-worktrees for worktree patterns (it handles `.gitignore` verification and directory selection).

### 2. While Editing

- Write a unit test for every feature or function implemented
- Tests must pass before moving to the next feature
- Commit after each logical unit using Conventional Commits:
  `feat:`, `fix:`, `test:`, `refactor:`, `chore:`

**REQUIRED:** See superpowers:test-driven-development for TDD patterns.

### 3. When Complete

1. Run the full test suite — all tests must pass
2. Push the branch and create a PR with a summary of changes (preferred over local merge)
3. Clean up: `git worktree remove .worktrees/<feature-name>`. DO NOT delete the branch
4. Add a comment in paperclip issue with the things you have done and what skills and tools you used

**REQUIRED:** See superpowers:finishing-a-development-branch for the full completion workflow including options and worktree cleanup.

### 4. Continuous Learning

If you discover a pattern, solution, or gotcha worth remembering — create or update the relevant skill in `.claude/skills/`.

**RECOMMENDED:** See creating-skills-skill for skill format and structure.

## Red Flags (stop and comply)

- "I'll just edit directly, worktree is overkill" → Always use worktrees
- "Tests can wait until the end" → Tests before moving to next feature
- "I'll commit everything at once" → Commit per logical unit
