import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async ({ url }) => {
	const code = url.searchParams.get('code');
	const clientId = env.GITHUB_CLIENT_ID;
	const clientSecret = env.GITHUB_CLIENT_SECRET;

	if (!clientId || !clientSecret) {
		return errorResponse('OAuth credentials are not configured on the server.');
	}

	if (!code) {
		return errorResponse('No authorization code received from GitHub.');
	}

	let token: string | null = null;
	let errorMessage: string | null = null;

	try {
		const response = await fetch('https://github.com/login/oauth/access_token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code })
		});

		const data = (await response.json()) as { access_token?: string; error?: string; error_description?: string };

		if (data.access_token) {
			token = data.access_token;
		} else {
			errorMessage = data.error_description ?? data.error ?? 'Unknown error from GitHub';
		}
	} catch (err) {
		errorMessage = 'Failed to exchange code for token.';
	}

	if (token) {
		return postMessageResponse(
			`authorization:github:success:${JSON.stringify({ token, provider: 'github' })}`
		);
	} else {
		return postMessageResponse(`authorization:github:error:${errorMessage}`);
	}
};

function postMessageResponse(message: string) {
	const html = `<!DOCTYPE html>
<html>
<body>
<script>
  (function () {
    function receiveMessage(e) {
      window.opener.postMessage(${JSON.stringify(message)}, e.origin);
    }
    window.addEventListener('message', receiveMessage, false);
    window.opener.postMessage('authorizing:github', '*');
  })();
<\/script>
</body>
</html>`;

	return new Response(html, {
		headers: { 'Content-Type': 'text/html; charset=utf-8' }
	});
}

function errorResponse(message: string) {
	return new Response(message, { status: 500 });
}
