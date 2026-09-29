# useGoalCompletionQueue

## Purpose

Batches rapid goal-completion actions before sending them to the goal service.

## Public API

`useGoalCompletionQueue(initialGoals)` returns the current goals, `toggleCompletion`, `addGoal`, and any completion error.

## Usage

Call `toggleCompletion(goalId, completed)` when a person changes a goal's completion state.

## Behavior

Updates are optimistic and are batched for 500 ms. Changes to the same goal are coalesced into its final state. A failed batch restores the affected goals.

## Limitations

The current service uses mocks; a future API must accept an array of goal IDs with their intended completion state.
