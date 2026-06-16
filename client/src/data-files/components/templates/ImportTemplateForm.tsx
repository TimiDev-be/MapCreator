import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useFile } from "../../../shared/hooks/File";
import Line from "../../../shared/components/Line";

const ValidationSchema = Yup.object().shape({
  file: Yup.mixed<File>()
    .required("Please select a file")
    .test("fileType", "Allowed only .html files", (file) => {
      if (!file) return false;
      return (
        (file as File).type === "text/html" ||
        (file as File).name?.toLowerCase().endsWith(".html")
      );
    }),
});

export default function ImportTemplateForm() {
  const { importTemplate } = useFile();
  const [file, setFile] = useState<File | undefined>(undefined);
  const [fileKey, setFileKey] = useState<number>(0);

  const handleSubmit = async (
    values: { file: File },
    { setSubmitting, resetForm },
  ) => {
    try {
      setSubmitting(true);
      await importTemplate(values.file);
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      alert("Failed to import template file: " + (error as Error).message);
    } finally {
      resetForm();
      setFile(undefined);
      setFileKey(fileKey + 1);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          file: undefined,
        }}
        validationSchema={ValidationSchema}
        onSubmit={handleSubmit}
        validateOnBlur
        validateOnChange
        validateOnMount
      >
        {({ setFieldValue, errors }) => (
          <Form id="import-template-form">
            <div className="group">
              <p className="form-title t-form-title">Import Template</p>
              <p className="form-subtitle t-form-subtitle">
                Import a template file to use it for filling in details and
                exporting a ready-to-print PDF document.
              </p>
            </div>
            <div className="group">
              <div className="wrapper">
                <label
                  htmlFor="file-template"
                  className="file-label t-form-field"
                >
                  select file
                </label>
                <input
                  type="file"
                  id="file-template"
                  name="file"
                  key={fileKey}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("file", e.target.files?.[0]);
                    setFile(e.target.files?.[0]);
                  }}
                />
              </div>
              {!errors.file && file && (
                <p className="t-form-about">Selected: {file.name}</p>
              )}
              {errors.file && (
                <div className="form-error t-form-error">
                  <p>{errors.file.toString()}</p>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="save-button t-form-field"
              disabled={!!errors.file || !file}
            >
              save
            </button>
            <Line height={1} />
          </Form>
        )}
      </Formik>
    </>
  );
}
