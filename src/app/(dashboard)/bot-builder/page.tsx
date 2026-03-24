import React from 'react'
import { BotList } from './components/BotList'
import { useAuthStore } from "@/src/store/authentication/auth.store";
import { SubscriptionRequired } from "@/src/components/ui/SubscriptionRequired";

const page = () => {
  return <BotList />
}

export default page