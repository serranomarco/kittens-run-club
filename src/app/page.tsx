require('dotenv').config()
import styles from './page.module.css'

export default function Home() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1>Kittens Run Club</h1>
            </main>
        </div>
    )
}
