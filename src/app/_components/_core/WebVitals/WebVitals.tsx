'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    console.log(metric);
  });

  return <div>printing report</div>;
}

// import { createContext } from 'react';
// interface Comment {
//   id: number;
//   message: string;
//   user: {
//     userId
//   }
// }

// export interface CommentType extends Omit<Comment, 'userId'> {
//   user: {
//     profile_pic: string;
//     name: string;
//   };
// }
// export interface CommentsContextType {
//   commentsData: CommentType[];
//   dispatchCommentsData: (action: { type: string; payload: any }) => void;
//   createComment: (action: ActionType) => void;
// }
// const defaultCommentContext = {
//   commentsData: [],
//   dispatchCommentsData: () => {},
//   createComment: () => {},
// };
// export const CommentsContext = createContext<CommentsContextType>(
//   defaultCommentContext
// );
