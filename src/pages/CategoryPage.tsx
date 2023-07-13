import { useState, useRef, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonList,
  IonSearchbar,
  IonLabel,
  IonReorder,
  IonIcon,
  IonButton,
  IonPopover,
  IonModal,
  IonInput,
  IonButtons,
  useIonToast,
} from "@ionic/react";
import { settingsOutline, list } from "ionicons/icons";
import "../main.css";

const CategoryPage = () => {
  const popover = useRef<HTMLIonPopoverElement | null>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [present] = useIonToast();

  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(undefined);

  const [showModal, setShowModal] = useState(false);

  const [categories, setCategories] = useState(["Dafault", "Achievement"]);
  const categoryRef = useRef<HTMLIonInputElement>(null);


  const openPopover = (e: any) => {
    const itemId = e.target.id;
    if (itemId === "addCategory") {
      setShowModal(true);
    } else {
      popover.current!.event = e;
      setPopoverOpen(true);
    }
  };

  const [presentingElement, setPresentingElement] = useState<
    HTMLElement | undefined
  >(undefined);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  useEffect(() => {
    console.log("Category Ref updated:", categoryRef.current);
  }, [categoryRef]);

  const handleDoneClick = () => {
    // const newCategory = categoryRef.current.trim();
    // if (newCategory !== "") {
    //   setCategories((prevCategories) => [...prevCategories]);
    //   setShowModal(false);
    //   console.log("non-empty category");
    // } else {
    //   console.log("empty category");
    // }
    const newCategory = categoryRef.current?.value as string;
    if (newCategory) {
      setCategories((prevCategories) => [...prevCategories, newCategory]);
      setShowModal(false);
      console.log("non-empty category");
    }
    else {
      console.log("empty category");
      presentToast('Enter new category');
    }
  };
  

  const presentToast = (message: string) => {
    present({
      message: message,
      duration: 100,
      position: "middle",
    });
  };

  return (
    <IonContent scrollY={true}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <p
          style={{
            fontSize: "28px",
            marginLeft: "15px",
            fontWeight: "bold",
            marginTop: "35px",
            marginBottom: "10px",
          }}>
          Category
        </p>
        <IonIcon
          id="popover-button"
          icon={settingsOutline}
          onClick={openPopover}
          style={{
            marginTop: "38px",
            fontSize: "28px",
            marginLeft: "210px",
          }}
        />
        <IonPopover
          ref={(ref) => {
            popover.current = ref;
          }}
          trigger="popover-button"
          dismissOnSelect={true}>
          {" "}
          <IonContent scrollY={false}>
            <IonList>
              <IonItem
                button={true}
                detail={false}
                onClick={openPopover}
                id="addCategory">
                Add Category
              </IonItem>

              <IonItem button={true} detail={false}>
                Edit Category
              </IonItem>
            </IonList>
          </IonContent>
        </IonPopover>
      </div>

      {/* TODO: search the name of the list (fusy.js) */}
      <IonSearchbar showClearButton="focus"></IonSearchbar>

      {/* TODO: make the list dynamic. It can be added from addCategory Modal && The list (data) of the categories must be saved in backend server */}
      <IonList>
        {categories.map((category, index) => (
          <IonItem key={index} style={{ padding: "7px", fontSize: "18px" }}>
            <IonLabel>{category}</IonLabel>
            <IonReorder slot="end" />
          </IonItem>
        ))}
      </IonList>

      {/* add category section  */}
      {showModal && (
        <IonModal
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
          presentingElement={presentingElement}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton
                  onClick={() => {
                    setShowModal(false);
                  }}>
                  Close
                </IonButton>
              </IonButtons>
              <IonTitle>New Category</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={handleDoneClick}>Done</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <IonContent scrollY={false}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
              }}>
              <div
                style={{
                  background: "rgba(70, 70, 70, 0.5)",
                  width: "350px",
                  height: "200px",
                  borderRadius: "10px",
                }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "15px",
                  }}>
                  <IonIcon
                    icon={list}
                    style={{
                      fontSize: "68px",
                      background: "rgba(56, 128, 255)",
                      padding: "15px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "20px",
                  }}>
                  <IonInput
                    ref={categoryRef}
                    placeholder="Category Name"
                    style={{
                      background: "rgba(120, 120, 120, 0.4)",
                      width: "300px",
                      borderRadius: "10px",
                      fontSize: "20px",
                      color: "rgba(255, 255, 255, 0.5)",
                      textAlign: "center",
                    }}
                    value={""}
                    // onIonChange={(e) => (categoryRef.current = e.detail.value!)}
                    ></IonInput>
                </div>
              </div>
            </div>
          </IonContent>
        </IonModal>
      )}
    </IonContent>
  );
};

export default CategoryPage;
