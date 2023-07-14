// DiaryEditor.tsx
import React from "react";
import { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  IonContent,
  IonIcon,
  IonActionSheet,
  IonButton,
  IonButtons,
} from "@ionic/react";
import { ellipsisHorizontalCircleOutline } from "ionicons/icons";

interface SettingSectionProps {}

export const SettingSection: React.FC<SettingSectionProps> = ({}) => {
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
