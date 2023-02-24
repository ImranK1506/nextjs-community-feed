import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react';
import Card from '@/components/Card'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Pagination from '@/components/Pagination';

function Questions() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const router = useRouter();
  const { page } = router.query;

  useEffect(() => {
    async function fetchData () {
      const data = await fetch (
        `https://api.stackexchange.com/2.2/questions?${page ? `page=${page}&` : ''}order=desc&sort=hot&tagged=reactjs&site=stackoverflow`
      );
      const result = await data.json();

      if (result) {
        setQuestions(result.items);
        setHasMore(result.has_more);
        setLoading(false);
      }
    }
    fetchData();
  }, [page]);

  return (
    <div className={styles['questions-container']}>
      <h2>Questions</h2>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          <div>
            {questions.map((question) => (
              <Link
                key={question.question_id}
                href={`/questions/${question.question_id}`}
              >
                <div className={styles['card-link']}>
                  <Card
                    key={question.question_id}
                    title={question.title}
                    views={question.view_count}
                    answers={question.answer_count}
                  />
                </div>
              </Link>
            ))}
          </div>
          <Pagination
            currentPage={parseInt(page) || 1}
            hasMore={hasMore}
          />
        </>
      )}
    </div>
  )
}

export default Questions;
