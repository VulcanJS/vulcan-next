import CSSModule from "~/components/vns/cssModule";
import StyledJsx from "~/components/vns/styledJsx";
//import { useForm } from "react-hook-form";

const CSSDebugPage = () => {
  return (
    <div>
      <h1>Debug page for CSS solutions</h1>
      <main>
        <div>
          Component using Styled JSX: <StyledJsx />
        </div>
        <div>
          Component using CSS Module: <CSSModule />
        </div>
        <div>
          Jut an H1: <h1>I am not styled</h1>
        </div>
      </main>
    </div>
  );
};

export default CSSDebugPage;
