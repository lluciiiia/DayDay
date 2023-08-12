import React from "react";
import { IonIcon, IonInput } from "@ionic/react";
import { list } from "ionicons/icons";
import { Category } from "../../../../data/interfaces";

interface ModalInputProps {
  categoryRef: React.RefObject<HTMLIonInputElement>;
  selectedCategory: Category | undefined;
}

const ModalInput: React.FC<ModalInputProps> = ({
  categoryRef,
  selectedCategory,
}) => {
  return (
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
            maxlength={10}
            style={{
              background: "rgba(120, 120, 120, 0.4)",
              width: "300px",
              borderRadius: "10px",
              fontSize: "20px",
              color: "rgba(255, 255, 255, 0.5)",
              textAlign: "center",
            }}
            value={selectedCategory?.name || ""}></IonInput>
        </div>
      </div>
    </div>
  );
};

export default ModalInput;
