import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import parseLink, { Links } from 'parse-link-header';

import { Issues } from './styles';

import api from '../../services/api';

interface RepositoryParams {
  repository: string;
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const ListIssue: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);

  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [issuesPage, setIssuesPage] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);

  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    setLoading(true);
    api
      .get(
        `/repos/${params.repository}/issues?per_page=${issuesPage}&page=${page}`,
      )
      .then((response) => {
        // setTotalPage(response.headers.get('') / issuesPage);
        setIssues([...issues, ...response.data]);
        setLoading(false);
      });

    // isLoading(loading && page === 1);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [params.repository, issues, page, issuesPage, loading, handleScroll]);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop <
        document.documentElement.offsetHeight ||
      page === totalPage ||
      loading
    ) {
      return;
    }

    setPage(page + 1);
  }

  return (
    <>
      <Issues>
        {issues.map((issue) => (
          <a key={issue.id} href={issue.html_url}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default ListIssue;
