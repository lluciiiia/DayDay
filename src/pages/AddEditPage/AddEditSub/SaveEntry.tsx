import { useHistory } from "react-router";
import { AddAll } from "../../ViewListPages/ViewListSub/UpdateAll";
import { useIonToast } from "@ionic/react";
import { presentToast } from "../../../else/presentToast";

export const SaveEntry = () => {
  const [present] = useIonToast();
  const handleSave = async (
    titleRef: React.RefObject<HTMLIonInputElement>,
    content: string,
    selectedDate: string | undefined,
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
      id: undefined,
    };

    try {
      await AddAll(entry);

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
    handleSave,
  };
};

export default SaveEntry;
