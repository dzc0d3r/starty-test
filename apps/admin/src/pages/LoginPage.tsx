import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { cn } from "@workspace/ui/lib/utils";
import { useAdminLoginMutation } from "api";
import { CheckCircle2, Eye, EyeOff, Loader2 } from "lucide-react";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const loginMutation = useAdminLoginMutation();
  const [showPassword, setShowPassword] = React.useState(false);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (loginMutation.isSuccess) {
      timer = setTimeout(() => {
        navigate(from, { replace: true });
      }, 1500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [loginMutation.isSuccess, navigate, from]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    loginMutation.mutate({ email, password });
  };

  // A simple change handler that resets the error state when the user starts typing again.
  const handleInputChange = () => {
    if (loginMutation.isError) {
      loginMutation.reset();
    }
  };

  const { isSuccess, isPending, isError, error } = loginMutation;

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form */}
      <div className="from-background to-muted/20 flex flex-1 items-center justify-center bg-gradient-to-br p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Success Animation Overlay: Driven directly by mutation state */}
          {isSuccess && (
            <div className="bg-background/80 animate-in fade-in-0 fixed inset-0 z-50 flex min-h-screen items-center justify-center backdrop-blur-sm">
              <div className="space-y-4 text-center">
                <CheckCircle2 className="animate-in zoom-in-0 mx-auto h-16 w-16 text-green-500 duration-500" />
                <h3 className="text-2xl font-semibold tracking-tight">
                  Welcome back!
                </h3>
                <p className="text-muted-foreground">
                  Redirecting you to the dashboard...
                </p>
              </div>
            </div>
          )}

          <div className="space-y-2 text-center">
            <div className="bg-primary mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
              <div className="bg-primary-foreground h-6 w-6 rotate-45 transform rounded-sm" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
            <p className="text-muted-foreground">
              Sign in to your admin account to continue
            </p>
          </div>

          <Card className="bg-card/95 border-0 shadow-lg backdrop-blur-sm">
            <CardContent className="p-2">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="admin@example.com"
                      required
                      defaultValue="admin1@test.com"
                      onChange={handleInputChange}
                      disabled={isPending || isSuccess}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        defaultValue="Password123!"
                        onChange={handleInputChange}
                        disabled={isPending || isSuccess}
                        className="h-11 pr-10"
                      />
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isPending || isSuccess}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {isError && (
                  <div className="text-destructive bg-destructive/10 border-destructive/20 animate-in shake rounded-lg border p-3 text-sm duration-300">
                    {"Login failed. Please check your credentials"}
                  </div>
                )}

                <Button
                  type="submit"
                  className="h-11 w-full"
                  disabled={isPending || isSuccess}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Success!
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Visual Experience */}
      <div className="from-primary/20 to-primary/5 relative hidden flex-1 overflow-hidden bg-gradient-to-br lg:block">
        <div className="absolute inset-0 overflow-hidden">
          <div className="bg-primary/10 absolute -top-24 -right-24 h-96 w-96 animate-pulse rounded-full blur-3xl" />
          <div className="bg-primary/15 absolute -bottom-32 -left-32 h-96 w-96 animate-pulse rounded-full blur-3xl delay-1000" />
          <div className="bg-primary/10 absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full blur-3xl delay-500" />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center p-12">
          <div className="grid max-w-2xl grid-cols-2 gap-6">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={cn(
                  "bg-background/50 rounded-xl border p-4 shadow-lg backdrop-blur-sm",
                  "animate-in fade-in-0 slide-in-from-bottom-8",
                  "transition-all duration-500 hover:-translate-y-2 hover:shadow-xl",
                )}
                style={{
                  animationDelay: `${i * 300}ms`,
                  animationFillMode: "both",
                }}
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/20 flex h-8 w-8 items-center justify-center rounded-lg">
                      <div className="bg-primary h-4 w-4 rounded-sm" />
                    </div>
                    <div className="bg-muted h-2 w-16 rounded" />
                  </div>
                  <div className="space-y-2">
                    <div className="bg-muted h-1 w-full rounded" />
                    <div className="bg-muted h-1 w-3/4 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
