export interface Answer {
  id: string
  domain: string
  facet: number
  score: number
  num: number
}

export interface FacetResult {
  score: number
  count: number
  result: 'low' | 'neutral' | 'high'
}

export interface DomainResult {
  score: number
  count: number
  result: 'low' | 'neutral' | 'high'
  facets: Record<string, FacetResult>
}

export type Scores = Record<string, DomainResult>

function calculateResult(score: number, count: number): 'low' | 'neutral' | 'high' {
  const avg = score / count
  if (avg > 3.5) return 'high'
  if (avg < 2.5) return 'low'
  return 'neutral'
}

export function processAnswers(answers: Answer[]): Scores {
  const result: Scores = {}

  answers.forEach(answer => {
    if (!result[answer.domain]) {
      result[answer.domain] = { score: 0, count: 0, result: 'neutral', facets: {} }
    }
    const domain = result[answer.domain]!
    domain.score += answer.score
    domain.count++

    const facetKey = String(answer.facet)
    if (!domain.facets[facetKey]) {
      domain.facets[facetKey] = { score: 0, count: 0, result: 'neutral' }
    }
    const facet = domain.facets[facetKey]!
    facet.score += answer.score
    facet.count++
  })

  Object.values(result).forEach(domain => {
    domain.result = calculateResult(domain.score, domain.count)
    Object.values(domain.facets).forEach(facet => {
      facet.result = calculateResult(facet.score, facet.count)
    })
  })

  return result
}
