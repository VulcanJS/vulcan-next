import Home from "~/components/home";
//import { useForm } from "react-hook-form";
import MDXMuiLayout from "~/components/layout/MDXMuiLayout";

const HomePage = () => {
  return (
    <MDXMuiLayout>
      <main>
        <Home />
        {/*content*/}
      </main>
      <style jsx>{`
        main {
          border-left: 72px solid;
          padding-left: 24px;
          border-image-source: linear-gradient(10deg, #e1009855, #3f77fa55);
          border-image-slice: 1;
          border-color: #3f77fa;
        }
      `}</style>
    </MDXMuiLayout>
  );
};

export default HomePage;
