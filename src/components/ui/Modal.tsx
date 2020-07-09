/**
 * Demo of a modal with styled-components-modifiers
 */
import colors from "~/lib/style/colors";
import styled from "styled-components";
import {
  applyStyleModifiers,
  ModifiersConfig,
  ModifiersProp,
  ModifierKeys,
} from "styled-components-modifiers";

const MODAL_MODIFIERS: ModifiersConfig = {
  // TODO: not style autocompletion
  // @see https://github.com/Decisiv/styled-components-modifiers/issues/51
  vulcan: () => `
    background-color: ${colors.orangeVulcan};
  `,
  themeDefault: (props) => `
    background-color: ${props.theme.backgroundColor};
    color: ${props.theme.color};
  `,
};

interface WithModifiers {
  modifiers?: ModifierKeys;
}
const ModalWrapper = styled.div<WithModifiers>`
  max-width: 800px;
  height: 500px;
  box-shadow: 2px 2px 1px 4px ${colors.pinkGraphql};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  ${applyStyleModifiers(MODAL_MODIFIERS)}
`;

interface ModalProps extends WithModifiers {
  children: React.ReactNode;
}
export const Modal = ({ children, modifiers }: ModalProps) => (
  <ModalWrapper modifiers={modifiers}>{children}</ModalWrapper>
);

export default Modal;
