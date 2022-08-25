import React from "react";
import { Modal, Card } from "@mui/material";
import { MultiStepForm } from "./MultiStepForm";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function NewOperationModal(props) {
    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Card
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    p: 8,
                    width: "80%",
                }}
            >
                <MultiStepForm
                    onSubmit={async () => {
                        await sleep(3000);
                        console.log("submit");
                    }}
                />
            </Card>
        </Modal>
    );
}
