import React from 'react';
import {auth} from "@/src/lib/auth";

const Welcome = async () => {
  const session = await auth();
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-bold">
        {session?.user ? (
          <span>Welcome back, {session.user.name}! 👋</span>
        ) : (
          <span>Welcome to our platform! 👋</span>
        )}
      </h1>
      <p className="text-lg text-gray-600">
        {session?.user ? (
          "Great to see you again"
        ) : (
          "Please sign in to get started"
        )}
      </p>
    </div>
  );
};

export default Welcome;
