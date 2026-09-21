export interface LegalListItem {
  text: string
  /** Optional opening phrase of `text`, shown in bold. Must be an exact prefix of `text`. */
  lead?: string
}

export type LegalBlock =
  | { type: 'heading'; level: 2 | 3 | 4 | 5; text: string }
  | { type: 'paragraph'; text: string; lead?: string }
  | { type: 'list'; variant: 'bullets' | 'definitions' | 'facts'; items: LegalListItem[] }
  | { type: 'address'; lines: string[] }

export interface LegalDocument {
  title: string
  updated: string
  blocks: LegalBlock[]
}
