import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { useSelector } from "react-redux";

import {
  IdentifyEditBackground,
  MultiSelectContainer,
  MultiSelect,
} from "./styles/identify-edit.styles";

const items = [
  {
    name: "Identify",
    children: [
      {
        name: "Deaf",
      },
      {
        name: "Hard of Hearing",
      },
      {
        name: "Hearing",
      },
    ],
  },
];

export const IdentifyEditScreen = ({ route, navigation }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const { field, identify } = route.params;

  const [selectedItem, setSelectedItem] = useState([identify]);

  useEffect(() => {
    navigation.setParams({
      field: field,
      oldValue: currentUser.identify,
      newValue: selectedItem.length === 0 ? "" : selectedItem[0],
    });
  }, [selectedItem]);

  const onSelectedItemsChange = (selectedItems) => {
    if (selectedItems.length === 2) {
      // the first item is deselected then second item is selected
      setSelectedItem([selectedItems[1]]);
    } else if (selectedItem[0] === selectedItems[0]) {
      // that item is selected, deselect it
      setSelectedItem([]);
    } else {
      setSelectedItem(selectedItems);
    }
  };

  return (
    <IdentifyEditBackground>
      <MultiSelectContainer>
        <MultiSelect
          items={items}
          IconRenderer={MaterialIcons}
          uniqueKey="name"
          subKey="children"
          selectText="Choose your identify..."
          showDropDowns={false}
          readOnlyHeadings={true}
          hideSearch={true}
          showChips={false}
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedItem}
          modalWithSafeAreaView={true}
        />
      </MultiSelectContainer>
    </IdentifyEditBackground>
  );
};
