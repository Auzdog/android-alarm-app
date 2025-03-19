import { Route, Switch } from "wouter";
import { Providers } from "./providers/Providers";
import AlarmPage from "./pages/AlarmPage";
import StopwatchPage from "./pages/StopwatchPage";
import TimerPage from "./pages/TimerPage";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Bell, Timer, Watch } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="flex justify-center border-b">
      <div className="flex space-x-2 p-2">
        <Link href="/">
          <Button variant="ghost" className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Alarm
          </Button>
        </Link>
        <Link href="/stopwatch">
          <Button variant="ghost" className="flex items-center gap-2">
            <Watch className="h-5 w-5" />
            Stopwatch
          </Button>
        </Link>
        <Link href="/timer">
          <Button variant="ghost" className="flex items-center gap-2">
            <Timer className="h-5 w-5" />
            Timer
          </Button>
        </Link>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Providers>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto p-4">
          <Switch>
            <Route path="/" component={AlarmPage} />
            <Route path="/stopwatch" component={StopwatchPage} />
            <Route path="/timer" component={TimerPage} />
          </Switch>
        </main>
      </div>
    </Providers>
  );
}

export default App;