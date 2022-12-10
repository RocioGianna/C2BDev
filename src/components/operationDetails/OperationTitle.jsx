import React from "react";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import moment from "moment";
import TitleBar from "../containers/TitleBar";
import DividedStack from "../containers/DividedStack";
import { MenuItem } from "@mui/material";
import { ProcessingChannel } from "../../model/ProcessingChannels";
import TitleBarValue from "../containers/TitleBar/TitleBarValue";
import { EditableDetailField } from "../EditableDetailField";
import { fetchProcessors } from "../../services/CollaboratorService";
import { getPossibleStatus } from "../../utils/OperationUtils";
import IconButton from "@mui/material/IconButton";

export function OperationTitle({ operation }) {

    const creationDate = moment(operation.creationDate).format("DD/MM/YYYY");

    return (
        <TitleBar
            title={"Operación #" + operation.operationCode + ", " + creationDate}
            navigateBackTo="/ops/"
            customActions={
                <DividedStack direction="row" alignItems="center" spacing={2}>
                    <TitleBarValue
                        label="Canal"
                        editable
                        value={operation.channel || "-"}
                        InputComponent={EditableDetailField}
                        inputProps={{
                            name: "selectOptional",
                            type: "select",
                            column: "CHANNEL",
                            options: [
                                <MenuItem key={-1} value={"-"}>-</MenuItem>,
                                ...Object.entries(ProcessingChannel).map((entry, i) => {
                                    return <MenuItem key={i} value={entry[0]}>{entry[0]}</MenuItem>;
                                })],
                        }} />
                    <TitleBarValue
                        label="Tramitadora"
                        editable
                        value={operation.processor?.userCode || "-"}
                        InputComponent={EditableDetailField}
                        inputProps={{
                            name: "processor",
                            type: "select",
                            column: "PROCESSOR",
                            fetchOptions: async () => [
                                <MenuItem key={-1} value={"-"}>-</MenuItem>,
                                ...(await fetchProcessors()).data.map((processor, i) => {
                                    return <MenuItem key={i} value={processor.userCode}>{processor.userCode}</MenuItem>;
                                })],
                        }} />
                    <TitleBarValue
                        label="Estado"
                        editable
                        value={operation.status}
                        InputComponent={EditableDetailField}
                        inputProps={{
                            name: "select",
                            type: "select",
                            column: "STATUS",
                            fetchOptions: () => [
                                <MenuItem key={-1} value={operation.status}>{operation.status}</MenuItem>,
                                ...getPossibleStatus(operation.status).map((status, i) => {
                                    return <MenuItem key={i} value={status}>{status}</MenuItem>;
                                })],
                        }} />
                    <IconButton disabled sx={{ mr: 1 }}>
                        <LocalPrintshopIcon />
                    </IconButton>
                </DividedStack>
            } />

    );
}
