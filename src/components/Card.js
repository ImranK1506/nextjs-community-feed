import styles from '@/styles/Home.module.css'

function Card({ title, views, answers }) {
  return (
    <div className={styles['card-wrapper']}>
      <h2 className={styles['card-title']}>{title}</h2>
      <p className={styles['card-count']}>
        Views: {views} | Answers {answers}
      </p>
    </div>
  )
}

export default Card;
