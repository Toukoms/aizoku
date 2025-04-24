import React from 'react';
import Link from "next/link";

function LandingPage() {
  return (
    <div>
      <div>
        <p>AIZUKO | Landing page</p>
        <Link href={"/chat"}>Start chat</Link>
      </div>
    </div>
  );
}

export default LandingPage;