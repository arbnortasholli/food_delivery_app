import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  GithubAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { OAuthProvider } from 'firebase/auth/web-extension';

export const registerUser = async (email, password, fullName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (fullName) {
      await updateProfile(user, {
        displayName: fullName
      });
    }

    return { user, error: null };
  } catch (error) {
    let errorMessage = error.message;
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'This email is already registered';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Password should be at least 6 characters';
    }
    return { user: null, error: errorMessage };
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    let errorMessage = error.message;
    if (error.code === 'auth/invalid-credential') {
      errorMessage = 'Invalid email or password';
    } else if (error.code === 'auth/user-not-found') {
      errorMessage = 'No account found with this email';
    }
    return { user: null, error: errorMessage };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { error: null };
  } catch (error) {
    let errorMessage = error.message;
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'No account found with this email';
    }
    return { error: errorMessage };
  }
};

export const signInWithGitHub = async () => {
  try {
    console.log("Starting GitHub login...");
    const provider = new GithubAuthProvider();
    provider.addScope('user:email');
    
    const result = await signInWithPopup(auth, provider);
    console.log("GitHub login success:", result.user);
    
    return { user: result.user, error: null };
    
  } catch (error) {
    console.error("Gabim në GitHub login:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    
    return { user: null, error: error.message };
  }
};

