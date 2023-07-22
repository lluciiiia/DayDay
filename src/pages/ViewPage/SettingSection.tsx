import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { IonActionSheet } from "@ionic/react";
import { Entry, Category } from "../../data/interfaces";
import { EntryServiceImpl } from "../../data/DataService";
import { UpdateManager, UpdateResults } from "../../data/updateResults";

interface SettingSectionProps {
  entryData: Entry;
}

export const SettingSection: React.FC<SettingSectionProps> = ({
  entryData,
}) => {
  const history = useHistory();

  const deleteEntry = async () => {
    try {
      // Update the backend with the modified entries data
      const entriesData = new EntryServiceImpl();
      await entriesData.deleteEntry(entryData.id);
      // update analysis
      const updateManager = new UpdateManager();
      await updateManager.deleteResultData(entryData.id);

      history.push("/calendar");
    } catch (error) {
      console.error(error);
    }
  };

  const editEntry = () => {
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
