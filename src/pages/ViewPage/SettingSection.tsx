import React from "react";
import { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { IonActionSheet } from "@ionic/react";
import { Entry, Category } from "../../data/interfaces";
import { EntryServiceImpl } from "../../data/DataService";

interface SettingSectionProps {
  entryData: Entry;
}

export const SettingSection: React.FC<SettingSectionProps> = ({
  entryData,
}) => {
  const history = useHistory();

  const deleteEntry = async () => {
    const entriesData = new EntryServiceImpl();
    try {
      // Update the backend with the modified entries data
      await entriesData.deleteEntry(entryData.id);
      history.push("/calendar");
    } catch (error) {
      console.error(error);
    }
  };

  const editEntry = () => {
    // TODO: edit the corresponding entry from the backend
    history.push("/edit", { entryData });
  };

  return (
    <IonActionSheet
      trigger="open-action-sheet"
      header="Actions"
      buttons={[
        {
          text: "Edit",
          handler: editEntry,
        },
        {
          text: "Delete",
          role: "destructive",
          handler: deleteEntry,
        },
        {
          text: "Cancel",
          role: "cancel",
        },
      ]}></IonActionSheet>
  );
};

export default SettingSection;