import styles from '@/styles/Home.module.css'
import Card from '@/components/Card'
import Link from 'next/link';
import Pagination from '@/components/Pagination';
import Head from 'next/head';

function Questions({ questions, hasMore, page }) {
  return (
    <>
      {/* SEO */}
      <Head>
        <title>Questions</title>
      </Head>
      <div className={styles['questions-container']}>
        <h2>Questions</h2>
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
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { page } = context.query;
  const data = await fetch(
    `https://api.stackexchange.com/2.2/questions?${page ? `page=${page}&` : ''}order=desc&sort=hot&tagged=reactjs&site=stackoverflow`
  );
  const result = await data.json();
  return {
    props: {
      questions: result.items,
      hasMore: result.has_more,
      page: page || 1,
    }
  };
}

export default Questions;
