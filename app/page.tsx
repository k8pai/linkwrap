import Form from '@/components/Form';
import QRcode from '@/components/QRcode';
import { getServerSession } from 'next-auth/next';
import RecentLinks from '@/components/RecentLinks';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Home() {
	const session = await getServerSession(authOptions);

	if (!session) console.log('not logged in from user...');

	return (
		<div className="flex-1 flex flex-col items-center lg:flex-row justify-evenly lg:items-start p-3 md:p-10 h-full w-full">
			<div className="max-w-full lg:max-w-3xl w-full">
				<Form email={session?.user?.email!} />
				<RecentLinks />
			</div>
			<QRcode />
		</div>
	);
}
