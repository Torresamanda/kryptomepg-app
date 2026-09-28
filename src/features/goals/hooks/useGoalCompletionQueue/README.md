# useGoalCompletionQueue

## Purpose

Batches rapid goal-completion actions before sending them to the goal service.

## Public API

`useGoalCompletionQueue(initialGoals)` returns the current goals, `complete`, `addGoal`, and any completion error.

## Usage

Call `complete(goalId)` when a person marks a goal as completed.

## Behavior

Updates are optimistic and are batched for 500 ms. A failed batch restores the affected goals.

## Limitations

The current service uses mocks; a future API must accept an array of goal IDs.
