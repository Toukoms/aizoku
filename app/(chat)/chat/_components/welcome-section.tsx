"use client"
import React from 'react';
import InputChat from "@/src/components/input-chat";

const WelcomeSection = () => {
  // TODO: Implement a real auth
  const data = "Toki"

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full px-2">
        {data
          ? (
            <div className="flex flex-col items-center gap-8">
              <WelcomeMessage userName={data}/>
              <InputChat/>
            </div>
          ) : <WelcomeMessage/>}
      </div>
    </div>
  );
};

const WelcomeMessage = ({userName}: { userName?: string }) => {
  return (
    userName
      ? (<div className="flex flex-col items-center">
        <p className="text-3xl sm:text-4xl md:text-5xl font-semibold">Welcome back, <span
          className="font-bold text-primary">{userName}</span>! 👋</p>
        <p className="text-lg md:text-xl text-muted-foreground">Great to see you again</p>
      </div>)
      : (<div className="flex flex-col items-center gap-2">
        <p className="text-3xl sm:text-4xl md:text-5xl font-semibold">Welcome to our platform! 👋</p>
        <p className="text-lg md:text-xl text-muted-foreground">Please sign in to get started</p>
      </div>)
  )
}

export default WelcomeSection;