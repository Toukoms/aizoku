import React from 'react';
import {auth} from "@/src/lib/auth";
import InputChat from "@/app/(root)/_components/input-chat";

const Welcome = async () => {
  const session = await auth();
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full px-2">
        {session?.user ? (
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-center">
              <p className="text-5xl font-semibold">Welcome back, <span
                className="font-bold text-primary">{session.user.name}</span>! 👋</p>
              <p className="text-lg text-muted">Great to see you again</p>
            </div>
            <InputChat/>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <p className="text-5xl font-semibold">Welcome to our platform! 👋</p>
            <p className="text-lg text-muted">Please sign in to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;
