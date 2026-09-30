import { goalsMock } from '../mocks/goals.mock'
import type { GetGoalsOptions, Goal } from '../types/Goal'

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase('pt-BR')
}

/** Returns goals filtered by audience and title, sorted alphabetically for management views. */
export async function getGoals({ audience = 'all', query = '' }: GetGoalsOptions = {}): Promise<
  Goal[]
> {
  const normalizedQuery = normalize(query.trim())

  return [...goalsMock]
    .filter((goal) => audience === 'all' || goal.audience === audience)
    .filter((goal) => !normalizedQuery || normalize(goal.title).includes(normalizedQuery))
    .sort((first, second) => first.title.localeCompare(second.title, 'pt-BR'))
}
