import { getProviders, signIn } from 'next-auth/react';
import { getCsrfToken } from 'next-auth/react';

export default function SignIn({ providers, csrfToken }) {
  return (
    <>
      <form method="post" action="/api/auth/signin/email">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label>
          Indirizzo email
          <input type="email" id="email" name="email" />
        </label>
        <button type="submit">Entra con link Email</button>
      </form>

      {Object.values(providers).map((provider) => {
        if (provider.name === 'Email') {
          return;
        }
        return (
          <div key={provider.name}>
            <button
              onClick={() =>
                signIn(provider.id, { callbackUrl: 'http://localhost:3000' })
              }
            >
              Entra con {provider.name}
            </button>
          </div>
        );
      })}
    </>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: { providers, csrfToken },
  };
}
