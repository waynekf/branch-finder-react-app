'use client';

import { useRouter, useParams } from 'next/navigation';

function BranchPage() {
  const params = useParams();
  const branch = params.slug;
  const router = useRouter();

  return (
    <div>
      {branch}
      <br />
      <button type="button" onClick={() => router.back()}>
        Click here to go back
      </button>
    </div>
  );
}

export default BranchPage;
