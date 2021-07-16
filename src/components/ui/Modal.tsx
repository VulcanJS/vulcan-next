/**
 * Demo of a modal
 * - with styled-components-modifiers, which allows
 * easy switch between different styles, based on props
 * - with react-spring, for physics based animation
 */
import colors from "~/lib/style/colors";
import { styled } from "@material-ui/core/styles";
import { useSpring, animated } from "react-spring";

// Demo using styled components and modifier
// We currently prefer using em
// import {
//   applyStyleModifiers,
//   ModifiersConfig,
//   ModifiersProp,
//   ModifierKeys,
// } from "styled-components-modifiers";
// const MODAL_MODIFIERS: ModifiersConfig = {
//   // TODO: not style autocompletion
//   // @see https://github.com/Decisiv/styled-components-modifiers/issues/51
//   vulcan: () => `
//     background-color: ${colors.orangeVulcan};
//   `,
//   themeDefault: (props) => `
//     background-color: ${props.theme.backgroundColor};
//     color: ${props.theme.color};
//   `,
// };

// This type should be included out-of-the bow in future versions of styled-components-modifiers
// @see https://github.com/Decisiv/styled-components-modifiers/pull/52
// @see https://github.com/Decisiv/styled-components-modifiers/pull/53/files
//interface WithModifiers {
//  modifiers?: ModifierKeys;
//}

const ModalWrapper = styled(animated.div)/*<WithModifiers>*/ `
  max-width: 800px;
  height: 500px;
  box-shadow: 2px 2px 1px 4px ${colors.pinkGraphql};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;
// ${applyStyleModifiers(MODAL_MODIFIERS)}

interface ModalProps /*extends WithModifiers*/ {
  children: React.ReactNode;
}
export const Modal = ({ children /*, modifiers*/ }: ModalProps) => {
  const animation = useSpring({
    opacity: 1,
    transform: "scale3d(1,1,1)",
    from: { opacity: 0, transform: "scale3d(1, 0, 1)" },
  });
  return (
    <ModalWrapper style={animation} /*modifiers={modifiers}*/>
      {children}
    </ModalWrapper>
  );
};

export default Modal;
