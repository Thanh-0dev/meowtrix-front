import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { Box } from "@mui/material";
import { SideNav } from '@/components/SideNav/SideNav';
import getUsers from '../actions/getUsers';
import getCurrentUser from '../actions/getCurrentUser';
import getConversations from '../actions/getConversations';
import { Onboarding } from './[conversationId]/components/Onboarding';

const DRAWER_WIDTH = 430;

export default async function ConversationsLayout({
  children
}: {
  children: React.ReactNode;
}) {

  const session = await getServerSession()

  if (!session) {
    redirect('/')
  }

  const users = await getUsers();
  const currentUser = await getCurrentUser();
  const conversations = await getConversations();

  return (
    <>
      <SideNav users={users} currentUser={currentUser} initialItems={conversations} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: `${DRAWER_WIDTH}px`,
          mt: ['0', '0', '0'],
        }}
      >
        {
          conversations.length === 0 ? (
            <Onboarding users={users} children={children}/>
          ) :
            children
        }
      </Box>
    </>
  );
}
