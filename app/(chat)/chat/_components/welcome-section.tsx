import React from 'react';
import InputChat from "@/src/components/input-chat";
import {getUserSession} from "@/src/actions/auth.action";

const WelcomeSection = async () => {
  const user = await getUserSession()

  if (!user) {
    return null
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full px-2">
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center">
            <p className="text-3xl sm:text-4xl md:text-5xl font-semibold">Welcome back, <span
              className="font-bold text-primary">{user.username}</span>! 👋</p>
            <p className="text-lg md:text-xl text-muted-foreground">Great to see you again</p>
          </div>
          <InputChat/>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;