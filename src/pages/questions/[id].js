import { useRouter } from 'next/router';
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react';
import Card from '../../components/Card';
import Head from 'next/head';

function QuestionDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState({});

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        `https://api.stackexchange.com/2.2/questions/${id}?site=stackoverflow`
      );
      const result = await data.json();

      if (result) {
        setQuestion(result.items[0]);
        setLoading(false);
      }
    }
    id && fetchData();
  }, [id]);

  return (
    <div className={styles['question-detail-container']}>
      <h2>Question: {id}</h2>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          {/* SEO */}
          <Head>
            <title>{question.title}</title>
          </Head>
          <Card
            title={question.title}
            views={question.view_count}
            answers={question.answer_count}
          />
        </>
      )}
    </div>
  );
}

export default QuestionDetail;
