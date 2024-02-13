import React from 'react';
import { formatISO9075 } from 'date-fns';
import { Link } from 'react-router-dom';

export default function Post({ _id, title, summary, cover, content, createdAt, author }) {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          {/* Add alt text for accessibility */}
          <img src={`http://localhost:4000/${cover}`} alt={`Cover for post: ${title}`} />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          {/* Use Link for author name with appropriate to prop */}
          <Link to={`/author/${author.username}`} className="author">
            {author.username}
          </Link>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}
