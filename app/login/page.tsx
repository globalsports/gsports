'use client'
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import signIn from './actions';

const LoginPage = () => {
  const handleGoogleLogin = () => {
    signIn();
  };

  return (
    <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
        <CardDescription className="text-center">
          Sign in to your account to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button 
          onClick={handleGoogleLogin}
          className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300"
        >
          Continue with Google
        </Button>
      </CardContent>
    </Card>
  );
};

export default LoginPage;