import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { useSelector } from "react-redux";

import {
  LanguagesEditBackground,
  MultiSelectContainer,
  MultiSelect,
} from "./styles/languages-edit.styles";

const items = [
  {
    name: "Languages",
    children: [
      {
        name: "ASL",
      },
      {
        name: "More languages in the future...",
        disabled: true,
      },
    ],
  },
];

export const LanguagesEditScreen = ({ route, navigation }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const { field, languages } = route.params;

  const [selectedItems, setSelectedItems] = useState(languages);

  useEffect(() => {
    navigation.setParams({
      field: field,
      oldValue: currentUser.languages,
      newValue: selectedItems,
    });
  }, [selectedItems]);

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };

  return (
    <LanguagesEditBackground>
      <MultiSelectContainer>
        <MultiSelect
          items={items}
          IconRenderer={MaterialIcons}
          uniqueKey="name"
          subKey="children"
          selectText="Choose languages..."
          showDropDowns={false}
          readOnlyHeadings={true}
          hideSearch={true}
          showChips={false}
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedItems}
          modalWithSafeAreaView={true}
        />
      </MultiSelectContainer>
    </LanguagesEditBackground>
  );
};
