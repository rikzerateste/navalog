import exp from 'constants';
import styles from './icons.module.scss'

interface IconProps {
    active?: boolean;
  }

export const HomeIcon: React.FC<IconProps> = ({ active = false }) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${styles.svgIcon} ${active ? styles.active : ''}`}>
      <g clipPath="url(#clip0_1070_870)">
        <path d="M0.666992 7.3335L8.00033 1.3335L15.3337 7.3335" className={styles.path1} strokeWidth="2" strokeMiterlimit="10"/>
        <path d="M6.66699 15.3335V11.3335H9.33366V15.3335" className={styles.path2} strokeWidth="2" strokeMiterlimit="10"/>
        <path d="M2.66699 8.66699V14.0003C2.66699 14.737 3.26366 15.3337 4.00033 15.3337H12.0003C12.737 15.3337 13.3337 14.737 13.3337 14.0003V8.66699" className={styles.path3} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square"/>
      </g>
      <defs>
        <clipPath id="clip0_1070_870">
          <rect width="16" height="16" fill="white"/>
        </clipPath>
      </defs>
    </svg>
);

export const EmpresasIcon: React.FC<IconProps> = ({ active = false }) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${styles.svgIcon} ${active ? styles.active : ''}`}>
        <path d="M1.55566 7.77783C2.81878 8.32539 5.081 9.11383 8.00011 9.11383C10.9192 9.11383 13.1814 8.32539 14.4446 7.77783" className={styles.path1} stroke="#ABABAB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8 8.22266V10.2227" className={styles.path2} stroke="#7D7D7D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M5.55566 4.22244V2.00022C5.55566 1.50955 5.95389 1.11133 6.44455 1.11133H9.55566C10.0463 1.11133 10.4446 1.50955 10.4446 2.00022V4.22244" className={styles.path3} stroke="#ABABAB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12.6668 4.22266H3.33344C2.3516 4.22266 1.55566 5.01859 1.55566 6.00043V11.7782C1.55566 12.7601 2.3516 13.556 3.33344 13.556H12.6668C13.6486 13.556 14.4446 12.7601 14.4446 11.7782V6.00043C14.4446 5.01859 13.6486 4.22266 12.6668 4.22266Z" className={styles.path4} stroke="#7D7D7D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
);

