import "./App.css";
import Header from "./Components/Header/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainBoardComp from "./Components/BoardComponents/MainBoardComp";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <MainBoardComp />
      </QueryClientProvider>
    </>
  );
}

export default App;
