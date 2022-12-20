import React from "react";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import moment from "moment";
import TitleBar from "../../components/new/TitleBar";
import DividedStack from "../../components/new/DividedStack";
import { MenuItem } from "@mui/material";
import { ProcessingChannel } from "../../model/Operation/ProcessingChannels";
import { fetchProcessors } from "../../services/CollaboratorService";
import { getPossibleStatus } from "../../utils/OperationUtils";
import IconButton from "@mui/material/IconButton";
import OperationDetailsTitleBarValue from "./OperationDetailsTitleBarValue";
import { isCollaborator } from "../../utils/RolesUtils";

function OperationDetailsTitleBar({ operation }) {

    const creationDate = moment(operation.creationDate).format("DD/MM/YYYY");

    return (
        <TitleBar
            title={"Operación #" + operation.operationCode + ", " + creationDate}
            navigateBackTo="/ops/"
            customActions={
                <DividedStack direction="row" alignItems="center" spacing={2}>
                    <OperationDetailsTitleBarValue
                        label="Canal"
                        value={operation.channel || "-"}
                        operation={operation}
                        show={!isCollaborator()}
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
                    <OperationDetailsTitleBarValue
                        label="Tramitadora"
                        value={operation.processor?.userCode || "-"}
                        operation={operation}
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
                    <OperationDetailsTitleBarValue
                        label="Estado"
                        value={operation.status}
                        operation={operation}
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

export default OperationDetailsTitleBar;
