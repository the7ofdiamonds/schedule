import { FirebaseApp, initializeApp } from 'firebase/app';
import type {
  Auth,
  GithubAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
} from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

// export type FirebaseConfig = {
//   apiKey: string;
//   authDomain: string;
//   databaseURL: string;
//   projectId: string;
//   storageBucket: string;
//   messagingSenderId: string;
//   appId: string;
//   measurementId: string;
// };

export const appleAuthProvider = new OAuthProvider('apple');
export const githubAuthProvider = new GithubAuthProvider();
export const googleAuthProvider = new GoogleAuthProvider();
export const microsoftAuthProvider = new OAuthProvider('microsoft.com');

// export const projectAuth = 