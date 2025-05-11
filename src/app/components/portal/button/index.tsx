import { Button } from 'primereact/button'
import React from 'react'
import styles from './styles.module.scss'

const index = (props :any) => {

  
  return (

    <Button type='submit'  label={props.title} onClick={props.onClick} icon={props.icon} disabled={props.disable} className={styles[props.tipoBotao]} style={{width: props.tamanho, height: props.altura}}/>
)
}

export default index