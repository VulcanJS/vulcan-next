import { Typography } from "@material-ui/core";

export const ErrorSuccessMessages = ({
  errorMsg,
  successMsg,
}: {
  errorMsg?: string | null;
  successMsg?: string | null;
}) => {
  if (!(errorMsg || successMsg)) return null;
  return (
    <>
      <Typography>
        {errorMsg && <p className="errorMessage"> {errorMsg} </p>}
        {successMsg && <p className="successMessage"> {successMsg} </p>}
      </Typography>
      <style jsx>
        {`
          .errorMessage {
            color: red;
            margin: 0 0 0;
          }
          .successMessage {
            color: green;
            margin: 0 0 0;
          }
        `}
      </style>
    </>
  );
};
