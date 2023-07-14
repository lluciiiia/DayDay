import React from "react";
import { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { IonActionSheet } from "@ionic/react";
import { EntriesData } from "../../GetPutData";

interface SettingSectionProps {
  entryData: Entry[];
}

export const SettingSection: React.FC<SettingSectionProps> = ({
  entryData,
}) => {
  const history = useHistory();

  const deleteEntry = async () => {
    const entriesData = new EntriesData();
    const currentEntries = await entriesData.getEntriesData();

    // Create a new array without the entry to be deleted
    const updatedEntries = currentEntries.filter((entry: any) => {
      // Return true for entries that are not equal to the entry to be deleted
      return entry !== entryData;
    });
    try {
      // Update the backend with the modified entries data
      await entriesData.putEntriesData(updatedEntries);
      history.push("/calendar");
    } catch (error) {
      console.error(error);
    }
  };
  const editEntry = () => {
    // TODO: edit the corresponding entry from the backend
    history.push("/edit", {});
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
