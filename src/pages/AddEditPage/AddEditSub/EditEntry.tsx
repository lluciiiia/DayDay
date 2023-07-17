import { AddAll } from "../../ViewListPages/ViewListSub/UpdateAll";
import { useIonToast } from "@ionic/react";
import SaveEntry from "./SaveEntry";
import { EntriesData } from "../../../GetPutData";
import { useHistory, useLocation } from "react-router";

interface LocationState {
  selectedDate: string;
  entryData?: Entry;
}

export const EditEntry = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const entryData = location.state?.entryData;
  const { handleSave } = SaveEntry();

  const deleteEntry = async () => {
    const entriesData = new EntriesData();
    console.log("type of entryData", typeof entryData);
    console.log(entryData);
    try {
      // Update the backend with the modified entries data
      await entriesData.deleteEntriesData(entryData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (
    titleRef: React.RefObject<HTMLIonInputElement>,
    content: string,
    selectedDate: string | undefined,
    selectedCategory: string,
    history: ReturnType<typeof useHistory>
  ) => {
    console.log("handleEdit: ", titleRef, content, selectedDate, selectedCategory);
    deleteEntry();
    handleSave(titleRef, content, selectedDate, selectedCategory, history);
  };

  return {
    handleEdit,
  };
};

export default EditEntry;
