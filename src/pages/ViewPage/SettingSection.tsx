// DiaryEditor.tsx
import React from "react";
import { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { IonActionSheet } from "@ionic/react";

interface SettingSectionProps {
  entryData: Entry[];
}

export const SettingSection: React.FC<SettingSectionProps> = ({
  entryData,
}) => {
  const history = useHistory();

  const deleteEntry = () => {
    // TODO: delete the corresponding entry from the backend
    history.push("/calendar");
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
