import { useNavigate, useParams } from "react-router-dom";
import {
  Pane,
  Button,
  Heading,
  ArrowLeftIcon,
  Paragraph,
  Spinner,
} from "evergreen-ui";

import {
  useGetFormQuery,
  usePublishFormMutation,
  useArchiveFormMutation,
} from "../../Utils/RTK/slices/formApi.slice.js";
import { useState } from "react";
import CreateStep from "./Components/CreateStep/CreateStep.js";
// import { PreviewSteps } from "../../components";

const Form = () => {
  const [addingStep, setAddingStep] = useState(false);
  const { id } = useParams();
  const { data: form, isLoading } = useGetFormQuery(id);
  const [publishForm, { isLoading: isPublishing }] = usePublishFormMutation();
  const [archiveForm, { isLoading: isArchiving }] = useArchiveFormMutation();

  const navigate = useNavigate();

  const handleAddNewStep = () => {
    setAddingStep(true);
  };

  const handleApprovalCycle = (isPreview) => {
    navigate(`/forms/${id}/approval-cycle`, {
      state: {
        isPreview,
      },
    });
  };

  const handlePublishForm = async () => {
    try {
      await publishForm(id).unwrap();
      navigate(`/forms`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleArchieveForm = async () => {
    try {
      await archiveForm(id).unwrap();
      navigate(`/forms`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Pane width="100%" paddingX={20} paddingTop={30}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {addingStep ? (
            <CreateStep />
          ) : (
            <>
              {" "}
              <Pane display="flex" justifyContent="space-between">
                <Pane display="flex" alignItems="center">
                  <ArrowLeftIcon
                    marginX={10}
                    cursor="pointer"
                    onClick={() => navigate(`/forms`)}
                  />
                  <Heading>{form?.name}</Heading>
                </Pane>
                <Pane display="flex">
                  {!["archived", "published"].includes(form.status) && (
                    <Button onClick={handleAddNewStep}>Add Step</Button>
                  )}

                  {form?.approvalCycle ? (
                    <Button onClick={() => handleApprovalCycle(true)}>
                      View Approval Cycle
                    </Button>
                  ) : (
                    <Button onClick={() => handleApprovalCycle(false)}>
                      Add Approval Cycle
                    </Button>
                  )}
                  {form.status !== "archived" && (
                    <Button
                      color={form.status !== "published" ? "green" : "red"}
                      isLoading={isPublishing || isArchiving || false}
                      onClick={
                        form.status !== "published"
                          ? handlePublishForm
                          : handleArchieveForm
                      }
                    >
                      {form.status !== "published" ? "Publish" : "Archive"}
                    </Button>
                  )}
                </Pane>
              </Pane>
              <Pane>
                <hr
                  style={{
                    width: "75%",
                    marginRight: "auto",
                    marginLeft: "auto",
                  }}
                />
              </Pane>
              <Heading variant="h5">Preview</Heading>
              {form?.steps?.length === 0 ? (
                <Paragraph>No steps added yet</Paragraph>
              ) : (
                <></>
                // <PreviewSteps steps={form?.steps} />
              )}
            </>
          )}
        </>
      )}
    </Pane>
  );
};

export default Form;
