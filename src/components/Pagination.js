import styles from '@/styles/Home.module.css';
import Link from 'next/link';

function Pagination({ currentPage, hasMore }) {

  return (
    <div className={styles['pagination-container']}>
      <Link href={`?page=${parseInt(currentPage) - 1}`}>
        <p className={styles['pagination-link']}
           disabled={currentPage <= 1 }
        >
          Previous
        </p>
      </Link>
      <Link href={`?page=${parseInt(currentPage) + 1}`}>
        <p className={styles['pagination-link']}
           disabled={!hasMore}
        >
          Next
        </p>
      </Link>
    </div>
  )
}

export default Pagination;
