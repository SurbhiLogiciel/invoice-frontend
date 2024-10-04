export interface SelectOption {
  value: string,
  label: string
}

export interface SelectorProps {
  options: SelectOption[],
  isMulti: boolean
}
