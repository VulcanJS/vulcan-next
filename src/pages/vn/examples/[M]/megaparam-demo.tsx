import { GetStaticPaths } from "next";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/dist/client/router";

/**
 * Run the server and open
 * http://localhost:3000/vn/examples/megaparam-demo
 */
export const MegaparamDemo = ({
  params,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { theme, company } = params;
  const router = useRouter();
  return (
    <div
      style={{
        maxWidth: "960px",
        margin: "auto",
        padding: "64px 32px",
        color: theme === "dark" ? "#ebefeb" : "#363333",
        background: theme === "dark" ? "#363333" : "#ebefeb",
      }}
    >
      <h1>Welcome back, user of company "{company}!"</h1>
      <p>
        This page demonstrate Megaparam, a pattern to statically render a
        complex combination of parameters.
      </p>
      <p>
        This example uses 2 parameters: theme, and company. Both are stored in
        the cookies.
      </p>
      <p>
        Some theme/company combinations are pre-rendered statically, some will
        be rendered on-the-fly.
      </p>
      <p>
        See our article for more insights:{" "}
        <a href="https://blog.vulcanjs.org/render-anything-statically-with-next-js-and-the-megaparam-4039e66ffde">
          M the Megaparameter
        </a>
      </p>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          const theme = evt.target["theme"]?.value;
          const company = evt.target["company"]?.value;
          (window as any).cookieStore.set("company", company);
          (window as any).cookieStore.set("theme", theme);
          router.reload();
        }}
      >
        <label htmlFor="theme">Pick a theme:</label>
        <select id="theme" name="theme" defaultValue={theme}>
          <option value="dark">Switch to dark theme</option>
          <option value="light">Switch to light theme</option>
        </select>
        <label htmlFor="company">Pick a company</label>
        <select id="company" name="company" defaultValue={company}>
          <option value="my_company">"my_company"</option>
          <option value="my_other_company">"my_other_company"</option>
        </select>
        <button>Submit</button>
      </form>
    </div>
  );
};

// Megaparams methods
interface PageParams {
  theme: string;
  company: string;
}
// dark-my_company => { theme: "dark", company: "my_company"}
export const decode = (megaparam: string): PageParams => {
  const split = megaparam.split("-");
  if (split.length !== 2)
    throw new Error(`Megaparam must respect the format "theme-company_name"`);

  const [theme, company] = split;
  if (!["dark", "light"].includes(theme))
    throw new Error(`Theme ${theme} does not exist.`);
  return {
    theme: theme,
    company,
  };
};

// { theme: "dark", company: "my_company"} => "dark-my_company"
export const encode = (params: PageParams): string => {
  return `${params.theme}-${params.company}`;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const params = [
    { theme: "light", company: "my_company" },
    // clients of "my_company" are known for using a dark theme
    // => we render it at build time
    { theme: "dark", company: "my_company" },
    { theme: "light", company: "my_other_company" },
  ];
  return {
    paths: params.map((p) => ({ params: { M: encode(p) } })),
    // less common combinations will be dynamically server-rendered
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const megaparam = context.params?.M as string;
  if (!megaparam) throw new Error(`Undefined megaparam`);
  if (Array.isArray(megaparam)) throw new Error("Megaparam cannot be an array");
  const params = decode(megaparam);
  return {
    props: {
      params,
    },
  };
};

export default MegaparamDemo;
