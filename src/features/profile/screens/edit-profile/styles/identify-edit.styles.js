import styled from "styled-components";
import SectionedMultiSelect from "react-native-sectioned-multi-select";

export const IdentifyEditBackground = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const MultiSelectContainer = styled.View`
  padding: 20px;
`;

export const MultiSelect = styled(SectionedMultiSelect).attrs((props) => ({
  styles: {
    button: {
      backgroundColor: props.theme.colors.button.primary,
      height: 50,
    },
    container: {
      width: "75%",
      height: "50%",
      flex: 0,
      alignSelf: "center",
    },
    modalWrapper: {
      justifyContent: "center",
    },
    selectToggle: {
      padding: 5,
      borderWidth: 2,
      borderColor: props.theme.colors.ui.lightergray,
      borderRadius: 10,
    },
    chipsWrapper: {
      marginTop: 8,
    },
    chipContainer: {
      backgroundColor: props.theme.colors.ui.primary,
      borderWidth: 0,
    },
    chipText: {
      color: props.theme.colors.text.secondary,
    },
    chipIcon: {
      color: props.theme.colors.button.secondary,
    },
  },
}))`
  padding: 20px;
`;
