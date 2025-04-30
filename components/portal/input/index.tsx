import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';


const Input = (props:any) => {

  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
        {props.type == 'inputIcon' 
        ?  <IconField iconPosition="left" className={styles['custom-input-field']}>
                    <InputIcon className={props.icon}> </InputIcon>
                    <InputText v-model="value1" placeholder={props.placeholder} className={styles['custom-input-text']} onChange={props.onChange}/>
            </IconField>

        :   <InputText className={styles['inputText']} id={props.id} name={props.name} value={value} onChange={(e) => setValue(e.target.value)} />
                }
         
    </div>
  )
}

export default Input