import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListSubheader,
  Typography,
} from "@mui/material";
import { ReactNode, useState } from "react";

export interface MultipleChoiceQuestionProps {
  question: string;
  answers: Array<string>;
  /** idx of the answer in the questions array (only one valid answer per choice) */
  validAnswerIdx: number;
  ifOk: ReactNode;
}
export const MultipleChoiceQuestion = ({
  question,
  answers,
  validAnswerIdx,
  ifOk,
}: MultipleChoiceQuestionProps) => {
  const [currentAnswer, setCurrentAnswer] = useState<number | undefined>(
    undefined
  );
  return (
    <Box>
      <List
        subheader={
          <ListSubheader>{question} (click on the right answer)</ListSubheader>
        }
      >
        {answers.map((answer, idx) => {
          return (
            <ListItem key={idx}>
              <ListItemButton
                onClick={() => setCurrentAnswer(idx)}
                selected={idx === currentAnswer}
              >
                {answer}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      {currentAnswer === validAnswerIdx ? ifOk : null}
      {currentAnswer && currentAnswer !== validAnswerIdx ? (
        <>
          <Typography sx={{ color: "warning.main" }}>
            Wrong answer...
          </Typography>
          <Typography sx={{ color: "secondary.main" }}>
            Try another answer to unlock next step!
          </Typography>
        </>
      ) : null}
    </Box>
  );
};
