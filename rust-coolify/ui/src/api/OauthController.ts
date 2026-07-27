import axios from 'axios';

// OAuth provayderləri üçün yönləndirmə URL-ni alır
export async function redirect(provider: string): Promise<string> {
  const response = await axios.get(`/api/oauth/redirect/${provider}`);
  return response.data.url;
}

// OAuth login callback-ni idarə edir
export async function callback(provider: string, code: string): Promise<any> {
  const response = await axios.get(`/api/oauth/callback/${provider}`, {
    params: { code }
  });
  return response.data;
}
