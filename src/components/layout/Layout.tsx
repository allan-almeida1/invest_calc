import { FunctionComponent } from "react";
import Header from "../header/Header";
import "./Layout.css";

interface LayoutProps {
  isHome?: boolean;
  children?: React.ReactNode;
  alignItems?: "start" | "center" | "end";
  justifyContent?: "start" | "center" | "end";
}

const Layout: FunctionComponent<LayoutProps> = ({
  children,
  isHome = false,
  alignItems = "start",
  justifyContent = "start",
}) => {
  return (
    <main className="container">
      <Header isHome={isHome} />
      <div className="content" style={{ alignItems, justifyContent }}>
        {children}
      </div>
    </main>
  );
};

export default Layout;
