import React from "react";
import { Header } from "./components/dashboard/header";
import WhiteBoxWrapper from "./components/ui/Box";
import Text from "./components/ui/Text";

const App: React.FC = () => {
  return (
    <>
      <Header />
      {/* Example 1: Wrapping a custom component */}
      <WhiteBoxWrapper className="w-[300px] h-[600px] bg-[#f1f1f1] ml-10 rounded-3xl">
        <Text text="Task"/>
      </WhiteBoxWrapper>
    </>
  );
};

export default App;
