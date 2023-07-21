import { useHistory } from "react-router";
import { useIonToast } from "@ionic/react";
import { presentToast } from "../../../else/presentToast";
import { Entry } from "../../../data/interfaces";
import {
  EntryServiceImpl,
  CategoryServiceImpl,
} from "../../../data/DataService";

export const EditEntry = () => {
  const [present] = useIonToast();
  const handleEdit = async (
    titleRef: React.RefObject<HTMLIonInputElement>,
    content: string,
    selectedDate: string,
    selectedCategory: string,
    history: ReturnType<typeof useHistory>,
    entryid: number | undefined
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

    const categoryService = new CategoryServiceImpl();
    const categories = categoryService.getAllCategories();
    const objectCategory = Object.values(categories).find(
      (value) => value.name === selectedCategory
    );

    const entry: Entry = {
      content: [
        {
          type: "text",
          text: content,
        },
      ],
      date: selectedDate,
      title: title,
      category: objectCategory,
      id: entryid,
    };

    const EntryService = new EntryServiceImpl();
    await EntryService.editEntry(entryid, entry);

    presentToast(present, "Your diary is saved!");
    setTimeout(() => {
      history.push("/calendar");
    }, 300);
  };

  return {
    handleEdit,
  };
};

export default EditEntry;
