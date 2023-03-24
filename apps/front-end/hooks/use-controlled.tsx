import { useState, useCallback, FC } from 'react'

type Props<T> = {
  controlled?: T
  default?: T
}
/**
 * @hook useControlled
 * @description 使 state 成為 controlled or uncontrolled state
 * @param {T} controlled 預設為 controlled 的 state，若無設定則 state 由父層控制
 * @param {T} default 初始值
 * @return {[T, (newValue: T) => void]} [state值, setState function]
 *
 */
export const useControlled = <T,>({
  controlled,
  default: defaultProp,
}: Props<T>): [T, (newValue: T) => void] => {
  const isControlled = controlled !== undefined
  const [valueState, setValue] = useState(defaultProp)
  const value = isControlled ? controlled : valueState
  const setValueIfUncontrolled = useCallback((newValue: T) => {
    if (!isControlled) {
      setValue(newValue)
    }
  }, [])

  return [value, setValueIfUncontrolled]
}
