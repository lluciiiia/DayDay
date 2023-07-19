import { useHistory } from "react-router";
import { EditAll } from "../../../else/UpdateAll";
import { useIonToast } from "@ionic/react";
import { presentToast } from "../../../else/presentToast";

interface LocationState {
  selectedDate: string;
  entryData?: Entry;
}

export const EditEntry = () => {
  const [present] = useIonToast();
  const handleEdit = async (
    titleRef: React.RefObject<HTMLIonInputElement>,
    content: string,
    selectedDate: string,
    selectedCategory: string,
    history: ReturnType<typeof useHistory>
  ) => {
    const title = titleRef.current?.value as string;

    if (title.trim() === "") {
      presentToast(present, "Please enter your diary title");
      return;
    }
    if (selectedCategory.trim() === "") {
      presentToast(present, "Please select your diary category");
      return;
    }
    if (content.trim() === "") {
      presentToast(present, "Please enter your diary content");
      return;
    }

    const entry: Entry = {
      content: [
        {
          type: "text",
          text: content,
        },
      ],
      date: selectedDate!,
      title: title,
      category: selectedCategory,
      key: undefined,
    };

    try {
      console.log("entry in EditEntry", entry);
      await EditAll(entry);

      presentToast(present, "Your diary is saved!");
      setTimeout(() => {
        history.push("/calendar");
      }, 300);
    } catch (error) {
      console.error(error);
      presentToast(present, "Failed to save your diary.");
    }
  };

  return {
    handleEdit,
  };
};

export default EditEntry;
