import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldX, Home, LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function Unauthorized() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <ShieldX className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Access Denied</CardTitle>
          <CardDescription>
            You don't have permission to access the authoring tools.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {user ? (
              <>Logged in as <strong>{user.email}</strong></>
            ) : (
              'You need to sign in with an authorized account.'
            )}
          </p>
          <div className="flex flex-col gap-2">
            <Button onClick={() => navigate('/')} variant="default">
              <Home className="h-4 w-4 mr-2" />
              Go to Home
            </Button>
            {user ? (
              <Button onClick={handleSignOut} variant="outline">
                Sign Out
              </Button>
            ) : (
              <Button onClick={() => navigate('/auth')} variant="outline">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
