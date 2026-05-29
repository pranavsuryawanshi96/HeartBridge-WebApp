// import AnswerClient from "./AnswerClient";

// // 1. Remove dynamicParams = true (this was the error source)
// // 2. We MUST return at least one ID for the build to succeed, 
// // even if it's a fake one.
// export async function generateStaticParams() {
//   return [{ id: 'template' }]; 
// }

// export default function Page() {
//   return <AnswerClient />;
// }

import AnswerClient from "./AnswerClient";

export const dynamic = 'force-dynamic';


export default function Page() {
  return <AnswerClient />;
}