import axios from 'axios';
import { ClerkProvider } from '@clerk/nextjs';

const isDev = process.env.NODE_ENV === 'development';

const baseURL: string = isDev ? 'http://127.0.0.1:8000' : 'https://dip-api.vercel.app';

const server = axios.create({ baseURL: baseURL });

export default server;
