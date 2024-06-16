"use client"
import Link from "next/link"; 
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { credentialLogin } from "@/app/actions";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [error, setError] = useState("")
  const router=useRouter()

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const response=await credentialLogin(formData)
      if (!!response.error) {
        setError(response.error)
        console.log(response.error);
      }else{
        router.push("/courses")
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?
          <p>
            Register as{" "}
            <Link href="/register/student" className="underline">
              Student
            </Link>{" "}
            Or{" "}
            <Link href="/register/instructor" className="underline">
              Instructor
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
