import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async ({ url }) => {
	const clientId = env.GITHUB_CLIENT_ID;

	if (!clientId) {
		return new Response('GITHUB_CLIENT_ID is not configured', { status: 500 });
	}

	const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
	githubAuthUrl.searchParams.set('client_id', clientId);
	githubAuthUrl.searchParams.set('scope', 'repo,user');
	githubAuthUrl.searchParams.set('redirect_uri', `${url.origin}/oauth/callback`);

	throw redirect(302, githubAuthUrl.toString());
};
