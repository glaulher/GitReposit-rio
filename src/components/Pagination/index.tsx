import React from 'react';

interface Page {
  issuePerPage: number;
  totalIssue: number;
  paginate: number;
}

// eslint-disable-next-line react/prop-types
const Pagination: React.FC<Page> = ({ issuePerPage, totalIssue, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalIssue / issuePerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate} href="!#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
