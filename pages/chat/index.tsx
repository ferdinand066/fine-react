import type { NextPage } from "next";
import Head from "next/head";
import ChatHeaderList from "../../components/Chat/ChatHeaderList";
import Header from "../../components/Header";
import { useAppContext } from "../../context/State";


const Chat: NextPage = () => {
  const sharedState = useAppContext();
  return ( sharedState.authenticated() &&
    <div>
      <Head>
        <title>FINE | Chat</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col dark:bg-gray-700 min-h-screen">
        <Header />
        <main className="w-full mx-auto flex flex-row max-w-7xl flex-1 border-x dark:border-gray-600">
          <div className="w-1/4 md:border-r hidden md:block dark:md:border-gray-600">
            <ChatHeaderList />
          </div>
          <div className="w-3/4 py-8 hidden md:block pl-4">
            <div className="w-full h-full flex flex-col justify-center items-center">
              <span className="text-5xl font-bold text-indigo-500">FINE</span>
              <span>Start a new conversation!</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Chat;
