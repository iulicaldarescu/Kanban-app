import "./App.css";
import Header from "./Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
      </QueryClientProvider>
    </>
  );
}

export default App;
