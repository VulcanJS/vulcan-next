import { Typography } from "@mui/material";

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
      {errorMsg && (
        <Typography className="errorMessage"> {errorMsg} </Typography>
      )}
      {successMsg && (
        <Typography className="successMessage"> {successMsg} </Typography>
      )}
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
