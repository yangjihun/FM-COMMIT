import AppLayout from './Layout/AppLayout';
import AppRouter from './routes/AppRouter';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <AppLayout>
        <AppRouter />
      </AppLayout>
    </AuthProvider>
  );
}

export default App;
