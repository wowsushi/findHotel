import { FC, PropsWithChildren } from 'react'
import styles from './style.module.css'
type Props = {
  loading: boolean
}

export const Loading: FC<PropsWithChildren<Props>> = ({
  loading,
  children,
}) => {
  if (loading)
    return (
      <div className={`${styles['lds-facebook']} flex mx-auto`}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )

  return children as JSX.Element
}
