import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react';
import Card from '../../components/Card'
import Link from 'next/link';
function Questions() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchData () {
      const data = await fetch (
        `https://api.stackexchange.com/2.2/questions?order=desc&sort=hot&tagged=reactjs&site=stackoverflow`
      );
      const result = await data.json();

      if (result) {
        setQuestions(result.items);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className={styles['questions-container']}>
      <h2>Questions</h2>
      {loading ? (
        <span>Loading...</span>
      ) : (
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
      )}
    </div>
  )
}

export default Questions;
