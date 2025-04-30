import Styles from "./button.module.scss"
import { Lexend } from "next/font/google";

const lexend = Lexend({
    weight: ['100','200','300','400','500','600','700','800','900'],
    style: ['normal'],
    subsets: ['latin']
  })


interface ButtonProps {
    title: string;
    kind: string;
    onClick: () => void;
    type: string;
}

const Button: React.FC<ButtonProps> = ({ title, kind, onClick, type }) => {

  const generationClassByKind = () => {
    if (kind === "secondary") return Styles.secondary;
    if (kind === "enviarForm") return Styles.enviarForm;
    return Styles.primary
  }

    return <button type="submit" className={`${lexend.className} ${Styles.button} ${generationClassByKind()}`} onClick={onClick}>{title}</button>
}

export default Button;